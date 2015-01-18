var _= require('lodash');
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

	// if string
	if(_.isString(val))
		return 'string';

	if(_.isNumber(val))
		return 'number';

	if(_.isBoolean(val))
		return 'boolean';

	if(_.isDate(val))
		return 'date';

	// if array
	if(_.isArray(val)){
		// recursive
		var ret= [];
		val.forEach(function (element, index) {
			ret.push(chkType(element));
		})
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

	// if it's a function
	if(_.isFunction(val))
		return 'function';

	// if unknown object
	if(_.isObject(val))
		return val.constructor.name; // return constructor name

	//default return 
	return 'object';
}