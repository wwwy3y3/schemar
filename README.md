# schemar
schemar generate a schema from a js object

## install
``` javascript
npm install schemar
```

## Api
### parse
``` javascript
var schemar= require('schemar');
schemar.parse(obj);
```

#### example
``` javascript
schemar.parse({ "name": "Alan", "hometown": "Somewhere, TX",
             "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]})
/*
return
{
	"name": "string",
	"hometown": "string",
	"kids": [{ "name": "string", "age": "number" }]
}
*/
```

### jsonSchema
return a [json schema](http://json-schema.org/latest/json-schema-core.html)

quoting from json schema core website
> JSON Schema defines the media type "application/schema+json", a JSON based format for defining the structure of JSON data. JSON Schema provides a contract for what JSON data is required for a given application and how to interact with it. JSON Schema is intended to define validation, documentation, hyperlink navigation, and interaction control of JSON data.

#### example
``` javascript
schemar.jsonSchema(datas, { textThres: 20, title: 'sparta!!' })
```

#### options
*	textThres: threshold length that string will be seen as `text`
*	title: outer object title

## types
*	string
*	number
*	boolean
*	date
*	date(format)
*	object