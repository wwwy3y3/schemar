var schemar= require('../');
var Datas= require('./datas');
var Layouts= require('./layouts');
var jsome= require('jsome');

jsome(schemar.parse(Datas.varies, { textThres: 20 }));
jsome(schemar.parse(Datas.nested, { textThres: 20 }));
jsome(schemar.jsonSchema(Datas.jeremy, Layouts.jeremy, { title: 'sparta!!', textThres: 20 }));
jsome(schemar.jsonSchema(Datas.joe));
jsome(schemar.jsonSchema(Datas.resume));
jsome(schemar.jsonSchema(Datas.strata));
//console.log(JSON.stringify(schemar.jsonSchema(Datas.strata), null, 4));

