var express = require("express");
var app = express();

// Use files from /public directory
app.use(express.static(__dirname+"/public"));

// Use CSS and JS files from /scripts directory
app.use(express.static(__dirname+"/scripts"));


/*app.get('/', function(req, res) {
  res.send('Good Orange');
  //TODO: sendFile with path to route actual HTML files
});*/

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('App listening');
});

var pg = require("pg");
// Connect to database

pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL, function(err, client) {
if(err) throw err;
console.log("Connected to DB, getting schemas...");
});