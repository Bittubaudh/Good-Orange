module.exports = {
  getRecommendationsByHistory: function(req, pg, res, cb) {
    var username = req.params.username;
    var topThree = [
      {'location': '','avg': 0},
      {'location': '','avg': 0},
      {'location': '','avg': 0}
    ];
    var foodStyles = [];
    var topTenRestaurants = [{},{},{},{},{}];

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
            var tmp = topThree[0];
            topThree[2] = topThree[1];
            topThree[1] = tmp;
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
          client.query("SELECT foodstyle FROM restaurant WHERE (location='"+
            topThree[2]['location']+"' OR location='"+topThree[1]['location']+
            "' OR location='"+topThree[0]['location']+"');")
            .on('row', function(row) {
              foodStyles.append(row['foodstyle']);
            })
            .on('end', function() {
              
            });
        });
    });
  },

  getRecommendationsByLocation: function(req, pg, res, cb) {
    cb({"not implemented": "not implemented"}, res);
  }
}