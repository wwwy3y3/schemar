exports.varies= { 
	"name": "Alan", "hometown": "Somewhere, TX",
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

exports.nested= {
	obj: {
		data: exports.varies
	},
	arr: [exports.varies]
}

exports.jeremy= {
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

exports.joe= {
	"title": "@wwwy3y3",
	"description": "fork from Joe's website",
	"icon": "./public/icon.png",
	"greeting": "Oh, hello.",
	"profile": "i am wwwy3y3, born in taipei, a lovely place! I love web development and enjoy my life",
	"contact": "i am wwwy3y3, web developer, currently in love with nodeJS!",
	"projects": [
		{
			"anchor": "p106",
			"bg-color": "#f1dbf0",
			"nav-title": "Magic Gardens",
			"title": "Magic Gardens Poster Show at One Grand Gallery",
			"subtitle": "Illustration—Design",
			"images": ["./public/mg-2.png"]
		},

		{
			"anchor": "p104",
			"bg-color": "#ffab59",
			"nav-title": "Happy Halloween",
			"title": "Halloween Decorations for Self Promotion",
			"subtitle": "Illustration—Design",
			"images": ["./public/halloween_1.png"]
		}
	]
}


exports.resume= {
	"resume": {
		  "basics": {
		    "name": "王小明",
		    "label": "程式員",
		    "picture": "https://avatars0.githubusercontent.com/u/1216029?v=3&s=140",
		    "email": "john@gmail.com",
		    "phone": "(912) 555-4321",
		    "website": "http://johndoe.com",
		    "summary": "A summary of John Doe...",
		    "location": {
		      "address": "2712 Broadway St",
		      "postalCode": "CA 94115",
		      "city": "San Francisco",
		      "countryCode": "US",
		      "region": "California"
		    },
		    "profiles": [{
		      "network": "Twitter",
		      "username": "john",
		      "url": "http://twitter.com/john"
		    }]
		  },
		  "work": [{
		    "company": "公司",
		    "position": "工程師",
		    "website": "http://company.com",
		    "startDate": "2013-01-01",
		    "endDate": "2014-01-01",
		    "summary": "Description...",
		    "highlights": [
		      "Started the company"
		    ]
		  }],
		  "volunteer": [{
		    "organization": "Organization",
		    "position": "Volunteer",
		    "website": "http://organization.com/",
		    "startDate": "2012-01-01",
		    "endDate": "2013-01-01",
		    "summary": "Description...",
		    "highlights": [
		      "Awarded 'Volunteer of the Month'"
		    ]
		  }],
		  "education": [{
		    "institution": "University",
		    "area": "Software Development",
		    "studyType": "Bachelor",
		    "startDate": "2011-01-01",
		    "endDate": "2013-01-01",
		    "gpa": "4.0",
		    "courses": [
		      "DB1101 - Basic SQL"
		    ]
		  }],
		  "awards": [{
		    "title": "Award",
		    "date": "2014-11-01",
		    "awarder": "Company",
		    "summary": "There is no spoon."
		  }],
		  "publications": [{
		    "name": "Publication",
		    "publisher": "Company",
		    "releaseDate": "2014-10-01",
		    "website": "http://publication.com",
		    "summary": "Description..."
		  }],
		  "skills": [{
		    "name": "Web Development",
		    "level": "Master",
		    "keywords": [
		      "HTML",
		      "CSS",
		      "Javascript"
		    ]
		  }],
		  "languages": [{
		    "language": "English",
		    "fluency": "Native speaker"
		  }],
		  "interests": [{
		    "name": "Wildlife",
		    "keywords": [
		      "Ferrets",
		      "Unicorns"
		    ]
		  }],
		  "references": [{
		    "name": "Jane Doe",
		    "reference": "Reference..."
		  }]
		}
}

exports.strata= {
    "name": "I am Strata",
    "title": "Ipsum lorem dolor aliquam ante commodo",
    "title2": "magna sed accumsan arcu neque.",
    "content": "Accumsan orci faucibus id eu lorem semper. Eu ac iaculis ac nunc nisi lorem vulputate lorem neque cubilia ac in adipiscing in curae lobortis tortor primis integer massa adipiscing id nisi accumsan pellentesque commodo blandit enim arcu non at amet id arcu magna. Accumsan orci faucibus id eu lorem semper nunc nisi lorem vulputate lorem neque cubilia.",
    "learnmore": "Learn More",
    "sub-title1": "Recent Work",
    "sub-title2": "Get In Touch",
    "sub-title2-content": "Accumsan pellentesque commodo blandit enim arcu non at amet id arcu magna. Accumsan orci faucibus id eu lorem semper nunc nisi lorem vulputate lorem neque lorem ipsum dolor.",
    "twitter": "Twitter",
    "github": "Github",
    "dribbble": "Dribbble",
    "email": "Email",
    "license": "© Untitled",
    "design": "HTML5 UP"
}