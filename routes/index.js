module.exports = function(app, pg) {
  var handleResponse = function(response, res) {
    return res.json(response);
  }

  var db = require('../db');
  app.get('/api/v1/restaurants', function(req, res) {
      db.getAllRestaurants(pg, res, handleResponse);
  });
  app.post('/api/v1/restaurants', function(req, res) {
  	db.addRestaurant(req, pg, res, handleResponse);
  });

}