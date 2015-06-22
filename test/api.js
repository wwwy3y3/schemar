var schemar= require('../');
var jsome= require('jsome');

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
             "kids": [{"name": "Jimmy", "age": 12}, {"name": "Sally", "age": 4}],
             "text": "們第林之不，放深進邊部視況流上大……點買行面共氣育沒修長響詩有權把……士華費金個教，起年會業天選形價門層！我眼法此水可重個親生到下表上輪部風全出灣名有說面面弟。國什感大別經教就遊的。數力個如急。國響依因價身未……不方熱、母們須親是一、想分後經起長子王導把華動。子我頭開人。食手者，試福看已；比深覺列！以看我我關大。其代陽當。好急明代是明臺原高生個以傳。已故信著我新：線對都使空產代！們音久我們軍王！內此車本下這兒"
         };
var nested= {
	obj: {
		data: data
	},
	arr: [data]
}

var data2= {
  "name": "Jeremy Dorn",
  "age": 25,
  "favorite_color": "#ffa500",
  "gender": "male",
  "yeah": "wwwy3y3@gmail.com",
  "location": {
    "city": "San Francisco",
    "state": "CA",
    "citystate": "San Francisco, CA"
  },
  "pets": [
    {
      "type": "dog",
      "name": "Walter"
    },
    {
      "type": "cat",
      "name": "Walter2"
    }
  ]
}
jsome(schemar.parse(data, { textThres: 20 }));
jsome(schemar.parse(nested, { textThres: 20 }));
jsome(schemar.jsonSchema(data2, { textThres: 20 }, 'sparta!!'))