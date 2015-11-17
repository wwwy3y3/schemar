var _= require('lodash');
var moment = require('moment');
var validator = require('validator');
var pickers= ['title', 'format', 'uniqueItems', 'options', 'headerTemplate', 'definitions', 'defaultProperties'];
var dateWrapper= function (text) {
	text= (text)?text.trim():'text';
	return 'date('+text+')';
}

var chkMoment= function (val, opts) {
	// check if a date string
	var m= moment(val);
	if(m.isValid()){
		return dateWrapper(m._f || 'string');
	}else if(opts && opts.textThres){
		if(val.length>= opts.textThres)
			return 'text';
		else
			return 'string';
	}
}

/*
parse
parse obj to schema
ex: { "name": "Alan", "hometown": "Somewhere, TX",
             "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]}
    ->
    {
		"name": "string",
		"hometown": "string",
		"kids": [{ "name": "string", "age": "number" }]
    }
*/
exports.parse= function (obj, opts) {
	//obj -> schema
	return chkType(obj, opts);
}

function chkType (val, opts) {
	// if null
	if(_.isNull(val))
		return 'null';

	// if undefined
	if(_.isUndefined(val))
		return 'undefined';

	// if array
	if(_.isArray(val)){
		// recursive
		var ret= [];
		// pick the first one
		ret.push(chkType(val[0], opts))
		return ret;
	}

	// if object
	// go nested
	if(_.isPlainObject(val)){
		var ret= {};
		for(key in val){
			ret[key]= chkType(val[key], opts);
		}
		return ret;
	}

	// if string
	if(_.isString(val))
		return chkMoment(val, opts);
		
	if(_.isBoolean(val))
		return 'boolean';

	if(_.isDate(val))
		return dateWrapper('object');

	if(_.isNumber(val))
		return 'number';

	// if it's a function
	if(_.isFunction(val))
		return 'function';

	// if unknown object
	if(_.isObject(val))
		return val.constructor.name; // return constructor name

	//default return 
	return 'object';
}


// parseObj
exports.parseObj= function (obj, opts) {
	return chkTypeFormat(obj, opts);
}

function chkTypeFormat (val, opts) {
	var retObj= {};
	// if null
	if(_.isNull(val)){
		retObj.type= 'null';
	}else if(_.isUndefined(val)){
		// if undefined
		retObj.type= 'undefined';
	}else if(_.isArray(val)){
		// recursive
		var ret= { type: 'array' };
		ret.items= chkTypeFormat(val[0], opts);
		return ret;
	}else if(_.isPlainObject(val)){
		// if object
		// go nested
		var ret= { type: 'object', items: {} };
		for(key in val){
			ret.items[key]= chkTypeFormat(val[key], opts);
		}
		return ret;
	}else if(_.isString(val)){
		retObj.type= 'string'; 
		var format= formater(val, opts);
		if(format)
			retObj.format= format;
	}else if(_.isBoolean(val)){
		retObj.type= 'boolean';
	}else if(_.isDate(val)){
		retObj.type= 'date';
	}else if(_.isNumber(val)){
		retObj.type= 'number';
	}else{
		retObj.type= 'object';
	}
		
	
	return retObj;
}

function formater (val, opts) {
	var types= {
		email: validator.isEmail,
		textarea: function (str) {
			return (opts && opts.textThres && str.length>= opts.textThres)
		}
	}

	// determine the format
	for(key in types){
		var validate= types[key];
		if(validate(val))
			return key
	}
	return null
}

// https://github.com/jdorn/json-editor
// http://json-schema.org/latest/json-schema-core.html
exports.jsonSchema= function (obj, layout) {
	layout= layout || {};
	var title= layout.title || 'data';
	return schemaParse(obj, layout, { title: title });
}

function schemaParse (val, layout, opts) {
	// a object
	if(_.isPlainObject(val)){
		var obj= { 
			type: 'object', 
			properties: {} 
		};

		if(opts.title)
			obj.title= opts.title;

		// append path to opts.path
		if(opts.path && opts.title)
			opts.path.unshift(opts.title);
		else
			opts.path= [];

		obj= _.merge(obj, attr(layout.schema, opts.path));

		// recursively assign all schemas in object
		for(key in val){
			// pass key to sub object
			// in case, sub object is a obj/array need a title
			// but if it's a string, nevermind then.
			obj.properties[key]= schemaParse(val[key], layout, {title: key, inArr: false, path: opts.path});
		}

		// shift the property used
		opts.path.shift();
		return obj;
	}

	// an array
	if(_.isArray(val)){
		var obj= { 
			type: 'array', 
			format: 'tabs',
			uniqueItems: true,
			title: opts.title
		};

		// append path to opts.path
		if(opts.path && opts.title)
			opts.path.unshift(opts.title);
		else
			opts.path= [];

		obj= _.merge(obj, attr(layout.schema, opts.path));

		// empty
		// wtf?
		if(val.length == 0)
			return obj;

		// iterate the attributes in first element
		var firstEle= val[0];
		obj.items= schemaParse(firstEle, layout, { inArr: true, path: opts.path});

		// insert data to defaults
		obj.default= val;

		// shift the property used
		opts.path.shift();

		return obj;
	}

	// default return
	// i dont know
	return stringFormat(val, layout, opts);
}


function stringFormat (str, layout, opts) {
	var obj= { type: 'string' };
	var types= {
		email: validator.isEmail,
		integer: validator.isInt,
		float: validator.isFloat,
		textarea: function (str) {
			return (layout && layout.textThres && str.length>= layout.textThres)
		}
	}

	// if in a array, no need to add default
	// data will be inserted outside
	if(!opts.inArr)
		obj.default= str;

	// add layout
	obj= _.merge(obj, attr(layout.schema, opts.path, opts.title));

	// determine the format
	for(key in types){
		var validate= types[key];
		if(validate(str)){
			obj.format= key;
			return obj;
		}
	}

	// default
	return obj;
}


function attr (schema, paths, name) {
	if(!schema) // empty schema
		return {};

	var current= schema;

	// go into right props for the path
	paths.forEach(function (path) {
		// if root
		if(paths.length==1)
			current= current[path].properties;
		else
			current= current.properties[path];
	})

	// no name, just the settings under this path
	// only return settings
	if(!name)
		return _.pick(current, pickers);

	// we got attrs
	return _.omit(current[name], 'properties');
}



var mergeInto= exports.mergeInto= function(schema, cols) {
    for(key in cols){
    	// settings are user defined properties
        var settings= cols[key];
        // item is the schema matched with the key we iterate now
        var item= schema.items[key];

        // if key in columns not defined in schema
        // create an item based on settings
        if(!item && key.indexOf('~')!==0){
        	// key not found in data
        	// perhaps developer too lazy
        	// add one
        	// pretend it's a string field
        	item= schema.items[key]= { type: 'string' };
        }else if(!item){
        	continue;
        }

        // only description
        if(_.isString(settings)){
            settings= {'~description': settings};
        }

        
        if(item.type=='array'){
            if(item.items.type=='array' || item.items.type=='object'){
                for(key in settings)
                    if(key=='~description')
                        item['description']= settings['~description'];
                    else if(key=='~format')
                        item.items['format']= settings['~format'];
                mergeInto(item.items, settings);
            }else if(item.items.type=='undefined'){
            	// undefined items type
            	// probably get a empty data
            	// so we can't parse any type info from data
            	item.items.type= 'object';
            	item.items.items= {};
            	for(key in settings)
                    if(key=='~description')
                        item['description']= settings['~description'];
                    else if(key=='~format')
                        item.items['format']= settings['~format'];
                    else
                    	item.items.items[key]= {};
                mergeInto(item.items, settings);
            }else{
                for(key in settings)
                	if(key=='~description')
                        item['description']= settings['~description'];
                    else if(key=='~format')
                        item.items['format']= settings['~format'];
                    else
                    	item[key]= settings[key];
            }
        }else if(item.type=='object'){
        	for(key in settings)
            	if(key=='~description')
             	   item['description']= settings['~description'];
            	else if(key=='~format')
            	    item['format']= settings['~format'];
        	mergeInto(item, settings);
        }else{
            // an object with description, format
            for(key in settings){
                var setting= settings[key];

                // if setting is key/value
                // it's either a format, description object
                // or a nested array/object description
                if(_.isString(setting)){
                    if(key=='~description')
                        item['description']= setting;
                    else if(key=='~format')
                        item['format']= setting;
                }

                    
                if (_.isPlainObject(setting)){
                    mergeInto(item.items[key], setting);
                }
                    
            }
        }
            
    }
}
