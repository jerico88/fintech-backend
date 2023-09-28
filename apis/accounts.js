const express = require("express");
const database = require("../database/database");

const router = express.Router();

// get all accounts
router.get("/get-all", (request, response) => {
    database.mysqlConnection.query("SELECT * FROM accounts", (error, results) => {
        if (error) {
            console.error(error);
            response.status(500).send("Internal Server Error");
        } else {
            response.status(200).send(results);
        }
    });
});

// get accounts by id 
router.get("/get-by-id", (request, response) => {
    database.mysqlConnection.query(`SELECT * FROM accounts WHERE id = ${request.query.id}`, (error, results) => {
        if (error) {
            console.error(error);
            response.status(500).send("Internal Server Error");
        } else {
            response.status(200).send(results);
        }
    });
});

// delete accounts by id 
router.delete("/delete-by-id", (request, response) => {
    database.mysqlConnection.query(`DELETE FROM accounts WHERE id = ${request.query.id}`, (error, results) => {
        if (error) {
            console.error(error);
            response.status(500).send("Internal Server Error");
        } else {
            response.status(200).send(`Account with id = ${request.query.id} deleted`);
        }
    });
});

module.exports = { router };