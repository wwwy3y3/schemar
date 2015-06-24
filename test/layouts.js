exports.jeremy= { 
	textThres: 20,
	title: 'sparta!!',
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
}