var Scientist = require('./model');

module.exports = function (app) {

    // get all scientists
    app.get('/api/scientists', function (req, res) {
      Scientist.find(function (err, scientists) {
          // if there is an error retrieving, send the error. nothing after res.send(err) will execute
          if (err) {
              res.send(err);
          }
          res.json(scientists); // return all todos in JSON format
      });
    });

    // create scientist
    app.post('/api/scientists', function (req, res) {
        Scientist.create({
            name: req.body.text
        }, function (err, todo) {
            if (err)
                res.send(err);
        });

    });
};
