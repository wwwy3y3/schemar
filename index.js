/*
parse
parse obj to schema
ex: { "name": "Alan", "hometown": "Somewhere, TX",
             "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]}
    ->
    {
		"name": String,
		"hometown": String,
		"kids": [{ "name": String, "age": Number }]
    }
*/
exports.parse= function (obj) {
	//obj -> schema
}