require("dotenv").config("./env");
const express = require("express");
const user = require("./apis/user");
const accounts = require("./apis/accounts");
const mysql = require("mysql");

const service = express();

service.use(express.json());
service.use("/user", user.router);
service.use("/accounts", accounts.router);

service.get("/", (request, response) => {
  response.sendFile(__dirname + "/login_page.html");
});

service.get("/project_homepage.html", (request, response) => {
  response.sendFile(__dirname + "/project_homepage.html");
});

service.get("/project_adduser.html", (request, response) => {
  response.sendFile(__dirname + "/project_adduser.html");
});

service.get("/project_viewuser.html", (request, response) => {
  response.sendFile(__dirname + "/project_viewuser.html");
});

service.get("/project_edituser.html", (request, response) => {
  response.sendFile(__dirname + "/project_edituser.html");
});

service.get("/project_deleteuser.html", (request, response) => {
  response.sendFile(__dirname + "/project_deleteuser.html");
});

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

// POST route to handle form submissions
service.post("/submit-form", (req, res) => {
  const { name, employee_id, job_title, salary } = req.body;
  const sql = `INSERT INTO EmployeeRecords (name, employee_id, job_title, salary) VALUES (?, ?, ?, ?)`;
  const values = [name, employee_id, job_title, salary];

  mysqlConnection.query(sql, values, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Data inserted successfully:", result);
      res.status(200).send("Data inserted successfully");
    }
  });
});

// GET route to retrieve all users
service.get("/employee/get-all", (req, res) => {
  const sql = "SELECT * FROM EmployeeRecords";

  mysqlConnection.query(sql, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Retrieved all users:", results);
      res.status(200).json(results); // Send the retrieved users as JSON
    }
  });
});

// GET route to retrieve a user by ID
service.get("/employee/get-by-id", (req, res) => {
  const employeeId = req.query.id; 
  const sql = "SELECT * FROM EmployeeRecords WHERE employee_id = ?";

  mysqlConnection.query(sql, [employeeId], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    } else {
      if (result.length > 0) {
        console.log("Retrieved user by ID:", result[0]);
        res.status(200).json(result[0]); // Send the retrieved user as JSON
      } else {
        res.status(404).send("Employee not found");
      }
    }
  });
});

// PUT route to update user information
service.put("/employee/update/:id", (req, res) => {
  const employeeId = req.params.id;
  const { name, job_title, salary } = req.body;
  const sql = `UPDATE EmployeeRecords SET name=?, job_title=?, salary=? WHERE employee_id=?`;
  const values = [name, job_title, salary, employeeId];

  mysqlConnection.query(sql, values, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Data updated successfully:", result);
      res.status(200).send("Data updated successfully");
    }
  });
});

// DELETE route to delete an employee by ID
service.delete("/employee/delete/:id", (req, res) => {
  const employeeId = req.params.id;
  const sql = `DELETE FROM EmployeeRecords WHERE employee_id = ?`;

  mysqlConnection.query(sql, [employeeId], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    } else {
      if (result.affectedRows > 0) {
        console.log(`Employee with ID ${employeeId} deleted successfully`);
        res
          .status(200)
          .send(`Employee with ID ${employeeId} deleted successfully`);
      } else {
        res.status(404).send(`Employee with ID ${employeeId} not found`);
      }
    }
  });
});

service.listen(3000, (error) => {
  if (error) console.error("Error occurred while starting app");
  console.log("Server started in port 3000");
});