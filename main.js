const express = require("express");
const mysql = require("mysql");

// Create connection
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "123",
    port: 3306
});

// Connect to MySQL
db.connect((error) => {
    if (error) throw error;
    console.log("MySQL connected!")
});

// const user = require("./apis/user");
const app = express();

// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE employees';
    db.query(sql, (error, result) => {
        if (error) throw error;
        console.log(result);
        res.send('DB created!');
    });
});

// app.use(express.json());
// app.use("/user", user.router);
// app.use("/account", account.router);

app.listen(
    3000,
    (error) => {
        if (error) console.error("Error occurred while starting app");
        console.log("Server started in port 3000");
    }
);