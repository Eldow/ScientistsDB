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
};
