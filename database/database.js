const mysql = require("mysql");
require('dotenv').config();

parameters = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: true,
  };

mysqlConnection = mysql.createConnection(parameters);
  
mysqlConnection.connect((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MySQL");
    }
});

module.exports = { mysqlConnection };