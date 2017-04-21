var express  = require('express');
var app      = express();                               				// create our app w/ express
var mongoose = require('mongoose');                     				// mongoose for mongodb
var morgan = require('morgan');                         				// log requests to the console (express4)
var bodyParser = require('body-parser');                				// pull information from HTML POST (express4)
var router = express.Router();                          				// use express for routing
var Agenda = require('agenda');																	// use agenda for task scheduling
var sparql = require('sparql');                                 // use sparql for data retrieving                   
// Datamodels related
var Scientist = require('./scientist/server/model.js');

var mongoConnectionString = "mongodb://127.0.0.1:27017/";

mongoose.connect(mongoConnectionString+'scientists');       // connect to mongoDB database on localhost
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

require('./scientist/server/routes.js')(app);										// load the api

var agenda = new Agenda({db: {address: mongoConnectionString+'agenda'}});// connect to mongo
var client = new sparql.Client('http://dbpedia.org/sparql');

agenda.define('refresh the database', function(job, done) {
  RefreshDatabase();
});

function RefreshDatabase(){
  QueryAtAllOffset('rdfs:label', 'label', false);
  QueryAtAllOffset('ontology:thumbnail', 'thumbnail', false);
  QueryAtAllOffset('rdfs:comment', 'description', false);
  QueryAtAllOffset('ontology:birthDate', 'birthDate', false);
  QueryAtAllOffset('ontology:deathDate', 'deathDate', false);
  QueryAtAllOffset('ontology:birthPlace/rdfs:label', 'birthPlace_label', true);
  QueryAtAllOffset('ontology:deathPlace/rdfs:label', 'deathPlace_label', true);
  QueryAtAllOffset('ontology:field/rdfs:label', 'field_label', true);
  QueryAtAllOffset('ontology:doctoralAdvisor/rdfs:label', 'doctoralAdvisor_label', true);
  QueryAtAllOffset('ontology:academicAdvisor/rdfs:label', 'academicAdvisor_label', true);
  QueryAtAllOffset('ontology:knownFor/rdfs:label', 'knownFor_label', true);
  QueryAtAllOffset('ontology:spouse/rdfs:label', 'spouse_label', true);
  QueryAtAllOffset('ontology:award/rdfs:label', 'award_label', true);
  QueryAtAllOffset('ontology:citizenship/rdfs:label', 'citizenship_label', true);
  QueryAtAllOffset('ontology:almaMater/rdfs:label', 'almaMater_label', true);
  QueryAtAllOffset('ontology:residence/rdfs:label', 'residence_label', true);
  QueryAtAllOffset('ontology:influenced/rdfs:label', 'influenced_label', true);
}

function QueryAtAllOffset(type, model, isArray){
  if(!isArray){
    QueryField(type, model, 0);
    QueryField(type, model, 10000);
    QueryField(type, model, 20000);
  } else {
    QueryArray(type, model, 0);
    QueryArray(type, model, 10000);
    QueryArray(type, model, 20000);
  }
}

function QueryField(type, model, offset){
  if(type.includes('thumbnail') || type.includes('birthDate') || type.includes('deathDate')){
    client.query(
    'PREFIX ontology: <http://dbpedia.org/ontology/> ' +
    'SELECT ?scientist (SAMPLE(?' + model + ') AS ?' + model + ') WHERE{ ?scientist a ontology:Scientist . ' +
    '?scientist ' + type + ' ?' + model + ' . ' +
    '} GROUP BY ?scientist LIMIT 10000 OFFSET ' + offset + '', function(err, res){
      UpdateScientist(res.results.bindings, model, false, 0)
    });
  } else {
    client.query(
    'PREFIX ontology: <http://dbpedia.org/ontology/> ' +
    'SELECT ?scientist (SAMPLE(?' + model + ') AS ?' + model + ') WHERE{ ?scientist a ontology:Scientist . ' +
    '?scientist ' + type + ' ?' + model + ' . ' +
    'FILTER(lang(?' + model + ') = "en") . ' +
    '} GROUP BY ?scientist LIMIT 10000 OFFSET ' + offset + '', function(err, res){
      UpdateScientist(res.results.bindings, model, false, 0)
    });
  }
}

function QueryArray(type, model, offset){
  client.query(
  'PREFIX ontology: <http://dbpedia.org/ontology/> ' +
  'SELECT ?scientist (group_concat(distinct ?' + model + ';separator="|") AS ?' + model + ') WHERE{ ?scientist a ontology:Scientist . ' +
  '?scientist ' + type + ' ?' + model + ' . ' +
  'FILTER(lang(?' + model + ') = "en") . ' +
  '} GROUP BY ?scientist LIMIT 10000 OFFSET ' + offset + '', function(err, res){
    UpdateScientist(res.results.bindings, model, true, 0)
  });
}

function UpdateScientist(dataset, fieldName, isArray, count){
  if(count >= dataset.length) {
    console.log("done");
    return;
  }
  if(dataset.length <= 0) return;
  var result = dataset[count];
  var uri = { 'uri': result.scientist.value }
  if(isArray){
    data = { [fieldName]: result[fieldName].value.split('|') };
  } else {
    data = { [fieldName]: result[fieldName].value };
  }
  Scientist.findOneAndUpdate(uri, {'$set':data}, {upsert:true}, function(err, doc){
    if (err) console.log("ERROR WHILE INSERTING :" + JSON.stringify(data, null, 4));
    count++;
    UpdateScientist(dataset, fieldName, isArray, count)
  });

}

function CleanDatabase(){
  mongoose.connection.collections['scientists'].drop(function(err, result) {
    console.log("Collection dropped");
  });
}

agenda.on('ready', function() {
  agenda.every('1 month', 'refresh the database');
  agenda.start();
});

app.use(express.static(__dirname))															// serve static files
app.get('/', function(req, res){																// server entry point
	res.render('index')																						// display index
})

app.listen(8080);																								// run on port 8080

console.log("App listening on port 8080");
