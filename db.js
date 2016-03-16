module.exports = {
  getAllRestaurants: function(pg, cb) {
    var results = [];

    pg.connect(process.env.DATABASE_URL, 
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
          cb(results);
        });
    });
  },

addRestaurant: function(req, pg, cb) {
    var result = {
      'status': 'ERROR',
      'message': 'Error connecting',
      'contents': {}
    };

    pg.connect("postgres://vgokgwmllyuvta:Y8jxNsM8vZOTSxd-fMBfvlqrF2@ec2-54-235-152-114.compute-1.amazonaws.com:5432/d51ijnnak3emfj", 
      function(err, client, done) {
      if(err) {
        done();
        result['contents'] = {'errorMSG': err};
        cb(result);
      }
      else {
        console.log("Connected to DB, getting schemas...");
        var request = req.params;

        client
          .query("INSERT INTO restaurant VALUES ('" + request.name + "', '" + request.location + "', " + request.qualityrating + ", " + request.pricerating + ", '" + request.foodstyle + "' );")
          .on('end', function() {
            done();
            result['status'] = 'SUCCESS';
            result['message'] = 'Restaurant ' + request.name + ' successfully added.';
            result['contents'] = request;
            cb(results);
          });
      }
    });
  }
};