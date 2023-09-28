//this file is a test in connecting frontend (ViewUser) with API
const express = require("express");
const database = require("../database/database");

const router = express.Router();

//pull from ViewUser
//const name = document.getElementById('name');
//const employee_id = document.getElementById('employee_id');
//const job_title = document.getElementById('job_title');
//const salary = document.getElementById('salary');

// get all records (Postman)
router.get("/get-all", (request, response) => {
    database.mysqlConnection.query("SELECT * FROM EmployeeRecords", (error, results) => {
        if (error) {
            console.error(error);
            response.status(500).send("Internal Server Error");
        } else {
            response.status(200).send(results);
        }
    });
});

// get records by id (Postman)
router.get("/get-by-id", (request, response) => {
    database.mysqlConnection.query(`SELECT * FROM EmployeeRecords WHERE id = ${request.query.id}`, (error, results) => {
        if (error) {
            console.error(error);
            response.status(500).send("Internal Server Error");
        } else {
            response.status(200).send(results);
        }
    });
});

//Add user function (Postman)
router.post("/add", (request,response)=>{
    const { name, employee_id, job_title, salary } = request.body; //how to connect this part to frontend input
    database.mysqlConnection.query(`INSERT into EmployeeRecords (name, employee_id, job_title, salary) values ('${name}','${employee_id}','${job_title}','${salary}')`, (error,results)=> {
        if(error) {
            console.error(error);
            response.status(500).send("Internal Server Error");
        } else {
            if (results["affectedRows"] != 0) {
                console.log("Added");          
            }
        }
    })
});




module.exports = { router };

