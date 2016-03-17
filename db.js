module.exports = {
  getAllRestaurants: function(pg, res, cb) {
    var results = [];

    pg.connect('postgres://vgokgwmllyuvta:Y8jxNsM8vZOTSxd-fMBfvlqrF2@ec2-54-235-152-114.compute-1.amazonaws.com:5432/d51ijnnak3emfj', 
      function(err, client, done) {
      if(err) {done(); console.log(err);}
      console.log("Connected to DB, getting schemas...");

      client
        .query("SELECT * FROM restaurant;")
        .on('row', function(row) {
          results.push(row);
        })
        .on('end', function() {
          done();
          cb(results, res);
        });
    });
  },

addRestaurant: function(req, pg, res, cb) {
    var result = {
      'status': 'ERROR',
      'message': 'Error connecting',
      'contents': {}
    };

    pg.connect('postgres://vgokgwmllyuvta:Y8jxNsM8vZOTSxd-fMBfvlqrF2@ec2-54-235-152-114.compute-1.amazonaws.com:5432/d51ijnnak3emfj', 
      function(err, client, done) {
      if(err) {
        done();
        result['contents'] = {'errorMSG': err};
        cb(result, res);
      }
      else {
        console.log("Connected to DB, getting schemas...");
        var request = req.body;

        client
          .query("INSERT INTO restaurant VALUES ('" + request.name + "', '" + request.location + "', " + request.qualityrating + ", " + request.pricerating + ", '" + request.foodstyle + "' );")
          .on('end', function() {
            done();
            result['status'] = 'SUCCESS';
            result['message'] = 'Restaurant ' + request.name + ' successfully added.';
            result['contents'] = request;
            cb(result, res);
          });
      }
    });
  },

  addCustomer: function(req, pg, res, cb) {
    var result = {
      'status': 'ERROR',
      'message': 'Error connecting',
      'contents': {}
    };

    pg.connect('postgres://vgokgwmllyuvta:Y8jxNsM8vZOTSxd-fMBfvlqrF2@ec2-54-235-152-114.compute-1.amazonaws.com:5432/d51ijnnak3emfj', 
      function(err, client, done) {
      if(err) {
        done();
        result['contents'] = {'errorMSG': err};
        cb(result, res);
      }
      else {
        console.log("Connected to DB, getting schemas...");
        var request = req.body;

        var queryString = "INSERT INTO customer VALUES ('" + request.fullname + "', '" + request.username + "', '" + request.hashedpassword + "', " + request.zipcode + ", ";
        var foodStyles = request['favoritefoodstyles[]'];
        var insertArrayStr = "";
        if(foodStyles.length > 0) {
          insertArrayStr = "'{";
          for(var i = 0; i < foodStyles.length-1; i++) {
            insertArrayStr += '"'+foodStyles[i]+'", ';
          }
          insertArrayStr += '"'+foodStyles[foodStyles.length-1]+'"}\''
        } else {
          insertArrayStr = "'{}'"
        }

        queryString += insertArrayStr + ');';

        client
          .query(queryString)
          .on('end', function() {
            done();
            result['status'] = 'SUCCESS';
            result['message'] = 'Customer account for ' + request.fullname + ' (' + request.username + ') successfully added.';
            result['contents'] = request;
            cb(result, res);
          });
      }
    });
  },

  getCustomerByUN: function(req, pg, res, cb) {
    var results = [];

    pg.connect('postgres://vgokgwmllyuvta:Y8jxNsM8vZOTSxd-fMBfvlqrF2@ec2-54-235-152-114.compute-1.amazonaws.com:5432/d51ijnnak3emfj', 
      function(err, client, done) {
      if(err) {done(); console.log(err);}
      console.log("Connected to DB, getting schemas...");

      client
        .query("SELECT * FROM customer WHERE username='"+req.params.username+"';")
        .on('row', function(row) {
          results.push(row);
        })
        .on('end', function() {
          done();
          cb(results[0], res);
        });
    });
  },

  getReviewByLocation: function(req, pg, res, cb) {
    var results = [];

    pg.connect('postgres://vgokgwmllyuvta:Y8jxNsM8vZOTSxd-fMBfvlqrF2@ec2-54-235-152-114.compute-1.amazonaws.com:5432/d51ijnnak3emfj', 
      function(err, client, done) {
      if(err) {done(); console.log(err);}
      console.log("Connected to DB, getting schemas...");

      var loc = req.params.location.replace(/\+/g, " ");

      client
        .query("SELECT * FROM review WHERE location='"+loc+"';")
        .on('row', function(row) {
          results.push(row);
        })
        .on('end', function() {
          done();
          cb(results[0], res);
        });
    });
  },

  addReview: function(req, pg, res, cb) {
    var result = {
      'status': 'ERROR',
      'message': 'Error connecting',
      'contents': {}
    };

    pg.connect('postgres://vgokgwmllyuvta:Y8jxNsM8vZOTSxd-fMBfvlqrF2@ec2-54-235-152-114.compute-1.amazonaws.com:5432/d51ijnnak3emfj', 
      function(err, client, done) {
      if(err) {
        done();
        result['contents'] = {'errorMSG': err};
        cb(result, res);
      }
      else {
        console.log("Connected to DB, getting schemas...");
        var request = req.body;

        // Insert new review
        client
          .query("INSERT INTO review VALUES (now(), " + request.qualityrating + ", '" + 
            request.comment + "', " + request.pricerating + ", '" + request.username+ "', '" + request.location + "', '" +
            request.restaurantname + "');")
          .on('end', function() {
            result['status'] = 'SUCCESS';
            result['message'] = 'Review for ' + request.restaurantname + ', by ' + request.username + ', successfully added.';
            result['contents'] = request;

            var newAvgPriceRating = 0;
            var newAvgQualityRating = 0;
            var rows = [];

            // Update the restaurant's average qualityrating and pricerating
            client
              .query("SELECT * FROM review WHERE location='"+request.location+"';")
              .on('row', function(row) {
                rows.push(row);
              })
              .on('end', function() {
                console.log(rows);
                var totPriceRating = 0.0;
                var totQualityRating = 0.0;
                for(var i = 0; i < rows.length; i++) {
                  totPriceRating += rows[i]['pricerating'];
                  totQualityRating += rows[i]['qualityrating'];
                }
                console.log(totPriceRating);
                console.log(totQualityRating);

                newAvgPriceRating = Math.round(totPriceRating/rows.length);
                newAvgQualityRating = Math.round(totQualityRating/rows.length);
                console.log(newAvgPriceRating);
                console.log(newAvgQualityRating);

                var updateQuery = "UPDATE restaurant SET (qualityrating, pricerating) = ("+newAvgQualityRating+", "+
                  newAvgPriceRating+") WHERE location='"+request.location+"';";
                console.log(updateQuery);

                client
                .query(updateQuery)
                .on('end', function() {
                  done();
                  cb(result, res);
                });
              });
          });
      }
    });
  },

  getAllReviews: function(pg, res, cb) {
    var results = [];

    pg.connect('postgres://vgokgwmllyuvta:Y8jxNsM8vZOTSxd-fMBfvlqrF2@ec2-54-235-152-114.compute-1.amazonaws.com:5432/d51ijnnak3emfj', 
      function(err, client, done) {
      if(err) {done(); console.log(err);}
      console.log("Connected to DB, getting schemas...");

      client
        .query("SELECT * FROM review;")
        .on('row', function(row) {
          results.push(row);
        })
        .on('end', function() {
          done();
          cb(results, res);
        });
    });
  }
};