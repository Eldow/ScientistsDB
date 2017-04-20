// retrieve the mongoose model
var Scientist = require('./model');

module.exports = function (app) {

    // GET all scientists
    app.get('/api/scientists', function (req, res) {
      Scientist.find(function (err, scientists) {
          // if there is an error retrieving, send the error. nothing after res.send(err) will execute
          if (err) {
              res.send(err);
          }
          res.json(scientists); // return all scientists in JSON format
      });
    });

    // GET a scientist by id
    app.get('/api/scientists/:id', function (req, res) {
        Scientist.findById(req.params.id, function (err, scientist) {
            if (err) {
              res.send(err);
            }
            res.json(scientist);
        });
    });

    // GET all nationalities
    app.get('/api/nationalities', function (req, res) {
        Scientist.find().distinct('citizenship_label', function (err, nationalities) {
            if (err) {
              res.send(err);
            }
            res.json(nationalities);
        });
    });

    // GET scientists by nationality
    app.get('/api/nationalities/:label', function (req, res) {
        Scientist.find({'citizenship_label':req.params.label}, function (err, scientists) {
            if (err) {
              res.send(err);
            }
            res.json(scientists);
        });
    });

	// GET all fields
    app.get('/api/fields', function (req, res) {
		    Scientist.find().distinct('field_label', function(err, fields) {
			       if (err) {
               res.send(err);
             }
             res.json(fields);
		    });
    });

    // GET scientist by field
      app.get('/api/fields/:label', function (req, res) {
  		    Scientist.find({'field_label': req.params.label }, function(err, scientists) {
  			       if (err) {
                 res.send(err);
               }
               res.json(scientists);
  		    });
      });
};
