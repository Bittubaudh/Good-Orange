module.exports = {
  getRecommendationsByHistory: function(req, pg, res, cb) {
    var username = req.params.username;
    var topThree = [
      {'location': '','avg': 0},
      {'location': '','avg': 0},
      {'location': '','avg': 0}
    ];
    var foodStyles = [];
    var topRestaurants = [
      {'location': '', 'name': '', 'avg': 0},
      {'location': '', 'name': '', 'avg': 0},
      {'location': '', 'name': '', 'avg': 0},
      {'location': '', 'name': '', 'avg': 0},
      {'location': '', 'name': '', 'avg': 0}
    ];

    pg.connect("postgres://vgokgwmllyuvta:Y8jxNsM8vZOTSxd-fMBfvlqrF2@ec2-54-235-152-114.compute-1.amazonaws.com:5432/d51ijnnak3emfj", 
      function(err, client, done) {
      if(err) {done(); console.log(err);}
      console.log("Connected to DB, getting schemas....");

      client
        .query("SELECT * FROM review WHERE username='"+username+"';")
        .on('row', function(row) {
          var pr = row['pricerating'];
          var qr = row['qualityrating'];
          var avg = (pr + qr) / 2.0;
          if(topThree[0]['avg'] <= avg) {
            topThree[2] = topThree[1];
            topThree[1] = topThree[0];
            topThree[0] = {
              'name': row['restaurantname'],
              'location': row['location'],
              'avg': avg
            };
          } else if(topThree[1]['avg'] <= avg) {
            topThree[2] = topThree[1];
            topThree[1] = {
              'name': row['restaurantname'],
              'location': row['location'],
              'avg': avg
            };
          } else if(topThree[2]['avg'] < avg) {
            topThree[2] = {
              'name': row['restaurantname'],
              'location': row['location'],
              'avg': avg
            };
          }
        })
        .on('end', function() {
          client
            .query("SELECT foodstyle FROM restaurant WHERE (location='"+
            topThree[2]['location']+"' OR location='"+topThree[1]['location']+
            "' OR location='"+topThree[0]['location']+"');")
            .on('row', function(row) {
              foodStyles.push(row['foodstyle']);
            })
            .on('end', function() {
              client.query("SELECT rest.name, rest.location, rest.pricerating, "+
                "rest.qualityrating FROM restaurant rest WHERE "+
                "(rest.foodstyle='"+foodStyles[0]+"' OR rest.foodstyle='"+foodStyles[1]+
                "' OR rest.foodstyle='"+foodStyles[2]+"');")
              .on('row', function(row) {
                var pr2 = row['pricerating'];
                var qr2 = row['qualityrating'];
                var avg2 = (pr2 + qr2) / 2.0;
                if(topRestaurants[0]['avg'] <= avg2) {
                  topRestaurants[4] = topRestaurants[3];
                  topRestaurants[3] = topRestaurants[2];
                  topRestaurants[2] = topRestaurants[1];
                  topRestaurants[1] = topRestaurants[0];
                  topRestaurants[0] = {
                    'name': row['name'],
                    'location': row['location'],
                    'avg': avg2
                  };
                }
                else if(topRestaurants[1]['avg'] <= avg2) {
                  topRestaurants[4] = topRestaurants[3];
                  topRestaurants[3] = topRestaurants[2];
                  topRestaurants[2] = topRestaurants[1];
                  topRestaurants[1] = {
                    'name': row['name'],
                    'location': row['location'],
                    'avg': avg2
                  };
                }
                else if(topRestaurants[2]['avg'] <= avg2) {
                  topRestaurants[4] = topRestaurants[3];
                  topRestaurants[3] = topRestaurants[2];
                  topRestaurants[2] = {
                    'name': row['name'],
                    'location': row['location'],
                    'avg': avg2
                  };
                } else if(topRestaurants[3]['avg'] <= avg2) {
                  topRestaurants[4] = topRestaurants[3];
                  topRestaurants[3] = {
                    'name': row['name'],
                    'location': row['location'],
                    'avg': avg2
                  };
                } else if(topRestaurants[4]['avg'] < avg2) {
                  topRestaurants[4] = {
                    'name': row['name'],
                    'location': row['location'],
                    'avg': avg2
                  };
                }
              })
              .on('end', function() {
                done();
                // Remove empty restaurant entries in case <5 matches were made
                for(var i = 0; i < topRestaurants.length; i++) {
                  if(topRestaurants[i]['name'].length <= 0) {
                    topRestaurants.splice(i, 1);
                  }
                }
                cb(topRestaurants, res);
              })
            });
        });
    });
  },

  getRecommendationsByLocation: function(req, pg, res, cb) {
    /*pg.connect("postgres://vgokgwmllyuvta:Y8jxNsM8vZOTSxd-fMBfvlqrF2@ec2-54-235-152-114.compute-1.amazonaws.com:5432/d51ijnnak3emfj", 
      function(err, client, done) {
      if(err) {done(); console.log(err);}
      console.log("Connected to DB, getting schemas....");

      restaurants = [];

      var locs = req.body.locations
      if(locs.length > 0) {
        queryString = "SELECT * FROM restaurant WHERE (";

        for(var i = 0; i < locs.length-1; i++) {
          var l = locs[i].replace(/\'/g, "\'\'");
          queryString += "location='" + l +"' OR ";
        }

        queryString += "location='" + locs[locs.length-1].replace(/\'/g, "\'\'") + "');";

        client
          .query(queryString)
          .on('row', function(row) {
            restaurants.push(row);
          })
          .on('end', function() {
            done();
            cb(restaurants, res);
          });
      else {
        done();
        */cb({"message":"No restaurants returned in vicinity"}, res);/*
      }*/
  }
}