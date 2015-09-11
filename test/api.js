var schemar= require('../');
var Datas= require('./datas');
var Layouts= require('./layouts');
var jsome= require('jsome');
var _= require('lodash');
var FS= require('q-io/fs');
var path= require('path')
/*
jsome(schemar.parse(Datas.varies, { textThres: 20 }));
jsome(schemar.parse(Datas.nested, { textThres: 20 }));
jsome(schemar.jsonSchema(Datas.jeremy, Layouts.jeremy));
jsome(schemar.jsonSchema(Datas.joe, { textThres: 20, title: 'sparta!!' }));
jsome(schemar.jsonSchema(Datas.resume, { textThres: 20, title: 'sparta!!' }));
jsome(schemar.jsonSchema(Datas.strata, { textThres: 20, title: 'sparta!!' }));
jsome(schemar.parseObj(Datas.resume, { textThres: 20 }))*/
//console.log(JSON.stringify(schemar.jsonSchema(Datas.strata), null, 4));
//var fs= require('fs');
//var json= JSON.parse(fs.readFileSync('./canner.json', 'utf8'));
//var schema= schemar.parseObj(json.data, { textThres: 20 });
//jsome(schema)
FS.read(path.resolve(__dirname, 'withcols.json'))
.then(JSON.parse)
.then(function (json) {
		var obj= schemar.parseObj(json.data, { textThres: 20 });
		//jsome(obj);
	    schemar.mergeInto(obj, json.columns);
	    return obj;
	})

.then(function (obj) {
	jsome(obj)
})

.catch(function (err) {
	console.log(err.stack);
})
