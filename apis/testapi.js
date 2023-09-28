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
router.get("/view-all", (request, response) => {
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

//delete record by id (postman)
router.delete("/delete-by-id", (request,response)=>{
    database.mysqlConnection.query(`DELETE from EmployeeRecords where id=${request.query.id}`, (error,results) => {
        if (error) {
            console.log(error);
            response.status(500).send("Internal Server Error");
        } else {
            console.log("Deleted");
            response.status(200).send("Deleted");
        }
    })
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
                response.status(200).send("Added");
            }
        }
    })
});

//Edit user function (Postman)
router.put("/edit-by-id", (request,response)=>{
    const { name, employee_id, job_title, salary } = request.body; //how to connect this part to frontend input
    database.mysqlConnection.query(`Update EmployeeRecords set name = '${name}', employee_id = '${employee_id}', job_title = '${job_title}', salary = '${salary}' where id = ${request.query.id}`, (error,results) => {
        if (error) {
            console.error(error);
            response.status(500).send("Internal Server Error");
        } else {
            console.log("Modified");
            response.status(200).send("Modified");
        }
    })
});


module.exports = { router };

