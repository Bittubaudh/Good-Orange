$(document).ready(function() {
  alert("hi");
  var pg = require("pg");

  // Connect to database

  pg.defaults.ssl = true;
  pg.connect(process.env.DATABASE_URL, function(err, client) {
    if(err) throw err;
    console.log("Connected to DB, getting schemas...");
  });
});