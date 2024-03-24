const mysql = require("mysql");
const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "flotilla",
});
mysqlConnection.connect(function (error) {
  if (error) {
    console.log(error);
    return;
  } else {
    console.log("Database is connected");
  }
});

module.exports = mysqlConnection;