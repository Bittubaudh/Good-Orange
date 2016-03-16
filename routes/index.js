module.exports = function(app, pg) {
  var db = require('../db');
	app.get('/api/v1/restaurants', function(req, res) {
    db.getAllRestaurants(pg, function(response) {
      return res.json(response);
    });
	});
}