var schemar= require('../');
var data = { "name": "Alan", "hometown": "Somewhere, TX",
			 "error": new Error(),
			 "null": null,
			 "undef": undefined,
			 "bool": false,
			 "boolArr": [true,false],
			 "obj": {
			 	"location": "taiwan",
			 	"time": Date.now()
			 },
             "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};
console.log(schemar.parse(data));