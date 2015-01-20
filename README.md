# schemar
schemar generate a schema from a js object

## install
``` javascript
npm install schemar
```

## Api
``` javascript
var schemar= require('schemar');
schemar.parse(obj);
```

## return
### for example
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