module.exports = function(app, pg) {
  var db = require('../db');
	app.get('/api/v1/customers', function(req, res) {
    db.getAllCustomers(pg, function(response) {
      return res.json(response);
    });
	});
}