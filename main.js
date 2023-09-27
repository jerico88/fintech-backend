const express = require("express");
const user = require("./apis/user");
const accounts = require("./apis/accounts");

const service = express();

service.use(express.json());
service.use("/user", user.router);
service.use("/accounts", accounts.router);

service.get('/', (request, response) => {
    response.sendFile(__dirname + '/login_page.html');
});

service.get('/project_homepage.html', (request, response) => {
    response.sendFile(__dirname + '/project_homepage.html');
});

service.listen(
    3000,
    (error) => {
        if (error) console.error("Error occurred while starting app");
        console.log("Server started in port 3000");
    }
);