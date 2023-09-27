//this file is a test in connecting frontend (ViewUser) with API
const express = require("express");
// const database = require("../database/database"); Database pathway once database are created. Database.js is to connect to sql server

const router = express.Router();

//pull from ViewUser
const name = document.getElementById('name');
const employee_id = document.getElementById('employee_id');
const job_rank = document.getElementById('job_rank');
const years = document.getElementById('years');
const major = document.getElementById('major');

console.log(name);



