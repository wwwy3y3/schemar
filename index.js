var _= require('lodash');
var moment = require('moment');
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
		ret.push(chkType(val[0]), opts)
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