var express = require("express");
var app = express();

// Use HTML files from /view directory
app.use(express.static(__dirname+"/view"));

// Use CSS and JS files from /scripts directory
app.use(express.static(__dirname+"/scripts"));


app.get('/', function(req, res) {
  res.send('Good Orange');
  //TODO: sendFile with path to route actual HTML files
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Good Orange listening on port 3000');
});