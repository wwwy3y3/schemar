var _= require('lodash');
var moment = require('moment');
var dateWrapper= function (text) {
	text= (text)?text.trim():'text';
	return 'date('+text+')';
}

var chkMoment= function (defaultType, val) {
	// check if a date string
	var m= moment(val);
	if(m.isValid())
		return dateWrapper(m._f || 'string');
	else
		return defaultType;
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
exports.parse= function (obj) {
	//obj -> schema
	return chkType(obj);
}

function chkType (val) {
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
		ret.push(chkType(val[0]))
		return ret;
	}

	// if object
	// go nested
	if(_.isPlainObject(val)){
		var ret= {};
		for(key in val){
			ret[key]= chkType(val[key]);
		}
		return ret;
	}

	// if string
	if(_.isString(val))
		return chkMoment('string', val);
		
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