var express = require("express");
var app = express();

app.get('/', function(req, res) {
  res.send('Good Orange');
  //TODO: sendFile with path to route actual HTML files
});

app.listen(3000, function() {
  console.log('Good Orange listening on port 3000');
});