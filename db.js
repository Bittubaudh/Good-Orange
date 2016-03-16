module.exports = {
  getAllCustomers: function(pg, cb) {
    var results = [];

    pg.connect(process.env.DATABASE_URL, 
      function(err, client, done) {
      if(err) {done(); console.log(err);}
      console.log("Connected to DB, getting schemas...");

      client
        .query("SELECT * FROM customer;")
        .on('row', function(row) {
          results.push(row);
        })
        .on('end', function() {
          done();
          cb(results);
        });
    });
  }
};