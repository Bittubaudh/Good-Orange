var mysql = require("mysql");
// Connect to database
/*
var connection = mysql.createConnection({
  host: "hostname",
  user: "db_user",
  pw: "db_pw"
});

// On connection
connection.connect(function(err) {
  if(err) {
  	console.log("Error connecting to database");
  	return;
  }
  console.log("Connection established");
});

// On connection termination
connection.end(function(err) {
  // 'Gracefully' terminate, wait until enqueued queries
  // are good before COM_QUIT @ the MySQL server
});
*/