// this file will contain all APIs for user handling
const express = require("express");
const database = require("../mock_data");

const router = express.Router();

router.get("/get-all", (request, response) => {
    const users = database.get_all_users();
    response.send(users);
});

router.get("/get-user-by-id", (request, response) => {
    const { user_id } = request.query;
    const user = database.get_user_by_user_id(user_id);
    response.send(user);
});

router.post("/add", (request, response) => {
    const { first_name, last_name, email, phone } = request.body;
    database.add_user({
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone
    });
    response.send(`User ${first_name} added successfully`);
})

module.exports = { router };