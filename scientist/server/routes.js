// retrieve the mongoose model
var Scientist = require('./model');

module.exports = function (app) {

    // GET all scientists - to retrieve the database
    app.get('/api/scientists', function (req, res) {
      Scientist.find(function (err, scientists) {
          // if there is an error retrieving, send the error. nothing after res.send(err) will execute
          if (err) {
              res.send(err);
          }
          res.json(scientists); // return all scientists in JSON format
      });
    });

    // POST a scientist - to fill the database
    app.post('/api/scientists', function (req, res) {
        Scientist.create({
            name: req.body.text
        }, function (err, todo) {
            if (err)
                res.send(err);
        });

    });
};
