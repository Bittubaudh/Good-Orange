module.exports = function(app, pg) {
  var handleResponse = function(response, res) {
    return res.json(response);
  }

  var db = require('../db');
  // Restaurant endpoints
  app.get('/api/v1/restaurants', function(req, res) {
      db.getAllRestaurants(pg, res, handleResponse);
  });
  app.post('/api/v1/restaurants', function(req, res) {
    db.addRestaurant(req, pg, res, handleResponse);
  });
  app.get('/api/v1/restaurants/:location', function(req, res) {
    db.getRestaurantByLocation(req, pg, res, handleResponse);
  });
  app.delete('/api/v1/restaurants/:location', function(req, res) {
    db.deleteRestaurantByLocation(req, pg, res, handleResponse);
  });

  // Customer endpoints
  app.get('/api/v1/customers', function(req, res) {
    db.getAllCustomers(pg, res, handleResponse);
  });
  app.get('/api/v1/customers/:username', function(req, res) {
    db.getCustomerByUN(req, pg, res, handleResponse);
  });
  app.post('/api/v1/customers', function(req, res) {
    db.addCustomer(req, pg, res, handleResponse);
  });
  app.delete('/api/v1/delCustomer/:username', function(req, res) {
    db.deleteCustomerByUN(req, pg, res, handleResponse);
  });
  app.get('/api/v1/customers/:username/:password', function(req, res) {
    db.checkValidLogin(req, pg, res, handleResponse);
  });

  // Review endpoints
  app.get('/api/v1/reviews', function(req, res) {
    db.getAllReviews(pg, res, handleResponse);
  });
  app.get('/api/v1/reviews/locUN/:username/:location', function(req, res) {
    db.getReviewByLocationAndUN(req, pg, res, handleResponse);
  });
  app.get('/api/v1/reviews/location/:location', function(req, res) {
    db.getReviewByLocation(req, pg, res, handleResponse);
  });
  app.get('/api/v1/reviews/:username', function(req, res) {
    db.getReviewByUN(req, pg, res, handleResponse);
  });
  app.post('/api/v1/reviews', function(req, res) {
    db.addReview(req, pg, res, handleResponse);
  });
  app.delete('/api/v1/reviews/:username/:location', function(req, res) {
    db.deleteReviewByUNandLocation(req, pg, res, handleResponse);
  });
}