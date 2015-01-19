var schemar= require('../');
var data = { "name": "Alan", "hometown": "Somewhere, TX",
			 "error": new Error(),
			 "null": null,
			 "undef": undefined,
			 "bool": false,
			 "boolArr": [true,false],
			 "number": 123,
			 "numArr": [1,2,3],
			 "obj": {
			 	"location": "taiwan",
			 	"time": new Date()
			 },
			 "times":{
			 	"YYYY-MM-DD HH:mm": "2010-10-20 4:30",
			 	"YYYY MM DD": "2010 2 29",
			 	"YYYY-MM-DD": "2012-10-14"
			 },
             "kids": [{"name": "Jimmy", "age": 12}, {"name": "Sally", "age": 4}]};
console.log(schemar.parse(data));