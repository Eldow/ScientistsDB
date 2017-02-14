var express  = require('express');
var app      = express();                               				// create our app w/ express
var mongoose = require('mongoose');                     				// mongoose for mongodb
var morgan = require('morgan');                         				// log requests to the console (express4)
var bodyParser = require('body-parser');                				// pull information from HTML POST (express4)
var router = express.Router();                          				// use express for routing

mongoose.connect('mongodb://127.0.0.1:27017/scientists');       // connect to mongoDB database on localhost
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

require('./scientist/server/routes.js')(app);										// load the api

app.use(express.static(__dirname))															// serve static files
app.get('/', function(req, res){																// server entry point
	res.render('index')																						// display index
})

app.listen(8080);																								// run on port 8080

console.log("App listening on port 8080");
