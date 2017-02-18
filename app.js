var express  = require('express');
var app      = express();                               				// create our app w/ express
var mongoose = require('mongoose');                     				// mongoose for mongodb
var morgan = require('morgan');                         				// log requests to the console (express4)
var bodyParser = require('body-parser');                				// pull information from HTML POST (express4)
var router = express.Router();                          				// use express for routing
var Scientist = require('./scientist/server/model.js');
var dataset = require('./dataset.json');

mongoose.connect('mongodb://127.0.0.1:27017/scientists');       // connect to mongoDB database on localhost
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

require('./scientist/server/routes.js')(app);										// load the api


// Drop the collection
mongoose.connection.collections['scientists'].drop(function(err, result) {
	console.log("Collection dropped");
});

// Clean data set - TODO : Improve this after SPARQL course
var cleanDataset = [];
for(let elem of dataset){
	for(let key in elem){
		for(var value in elem[key]){
			if(elem[key][value] == "NULL" || !(value == "label" || value == "description" || value == "birthDate" || value == "deathDate" || value == "birthPlace_label" || value == "deathPlace_label" || value == "field_label" || value == "doctoralAdvisor_label" ||
				value == "notableStudent_label" || value == "academicAdvisor_label" || value == "knownFor_label" || value == "doctoralStudent_label" || value == "spouse_label" || value == "child_label" || value == "influencedBy_label" || value == "influenced_label" ||
				value == "education_label" || value == "occupation_label" || value == "award_label" || value == "citizenship_label" || value == "almaMater_label" || value == "nationality_label" || value == "soundRecording_label" ||
				value == "institution_label" || value == "residence_label" || value == "deathCause_label" || value == "restingPlace_label" || value == "relation_label" || value == "employer_label" || value == "parent_label")){
					delete elem[key][value];
				}
			}
			cleanDataset.push(elem[key]);
	}
}

// Insert dataset in mongodb
mongoose.connection.collections['scientists'].insertMany(cleanDataset, function(err,r) {
	if (err) {
     console.log(err);
   } else {
     console.log("Insert ok");
   }
})


app.use(express.static(__dirname))															// serve static files
app.get('/', function(req, res){																// server entry point
	res.render('index')																						// display index
})

app.listen(8080);																								// run on port 8080

console.log("App listening on port 8080");
