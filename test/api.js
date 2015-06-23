var schemar= require('../');
var Datas= require('./datas');
var jsome= require('jsome');

jsome(schemar.parse(Datas.varies, { textThres: 20 }));
jsome(schemar.parse(Datas.nested, { textThres: 20 }));

var obj2= schemar.jsonSchema(Datas.jeremy, 
	{ 
		textThres: 20,
		schema: {
			favorite_color: {
				title: 'favorite color'
			},

			gender: {
				enum: [ "male", "female" ]
			},

			location: {
				properties:{
					citystate: {
						description: "This is generated automatically from the previous two fields",
						template: "{{city}}, {{state}}",
						watch: {
							city: "location.city",
							state: "location.state"
						}
					}
				}
			},

			pets: {
				title: 'Pets',
				properties: {
					type:{
						enum: [ "cat", "dog", "bird", "reptile", "other" ],
			            default: "dog"
					}
				},
				uniqueItems: true,
				format: 'table'
			}
		}
 	}, 'sparta!!');
console.log(JSON.stringify(schemar.jsonSchema(Datas.joe), null, 4));

