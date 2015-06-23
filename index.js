var _= require('lodash');
var moment = require('moment');
var validator = require('validator');
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


// https://github.com/jdorn/json-editor
// http://json-schema.org/latest/json-schema-core.html
exports.jsonSchema= function (obj, layout, title) {
	return schemaParse(obj, layout, { keyname: title })
}


function stringFormat (str, layout, opts) {
	var obj= { type: 'string' };
	var types= {
		color: validator.isHexColor,
		date: validator.isDate,
		email: validator.isEmail,
		integer: validator.isInt,
		float: validator.isFloat,
		textarea: function (str) {
			return (layout && layout.textThres && str.length>= layout.textThres)
		}
	}

	if(!opts.inArr)
		obj.default= str;

	//console.log(opts.path.join('.')+'.'+opts.keyname);
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

function schemaParse (val, layout, opts) {
	// a object
	if(_.isPlainObject(val)){
		var obj= { type: 'object', properties: {} };

		if(opts.keyname)
			obj.title= opts.keyname;

		// append path to opts.path
		if(opts.path)
			opts.path.unshift(opts.keyname);
		else
			opts.path= [];

		// recursively assign all schemas in object
		for(key in val){
			// pass key to sub object
			// in case, sub object is a obj/array need a title
			// but if it's a string, nevermind then.
			obj.properties[key]= schemaParse(val[key], layout, {keyname: key, inArr: false, path: opts.path});
		}

		// shift the property used
		opts.path.shift();
		return obj;
	}

	// an array
	if(_.isArray(val)){
		var obj= { type: 'array', items: { type: "object", properties: {} } };
		obj.format= layout.arrayUI || 'table';
		obj.uniqueItems= layout.arrayUniqIt || true;

		if(opts.keyname)
			obj.title= opts.keyname;

		// append path to opts.path
		if(opts.path)
			opts.path.unshift(opts.keyname);
		else
			opts.path= [];

		// empty
		// wtf?
		if(val.length == 0)
			return obj;

		// iterate the attributes in first element
		var firstEle= val[0];
		for(key in firstEle){
			obj.items.properties[key]= schemaParse(firstEle[key], layout, {keyname: key, inArr: true, path: opts.path});
		}

		// defaults
		obj.default= val;

		// shift the property used
		opts.path.shift();

		return obj;
	}

	// default return
	// i dont know
	return stringFormat(val, layout, opts);
}
