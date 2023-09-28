const express = require("express");
const user = require("./apis/user");
const accounts = require("./apis/accounts");
const testapi = require("./apis/testapi"); 

const service = express();

service.use(express.json());
service.use("/user", user.router);
service.use("/accounts", accounts.router);
service.use("/employee",testapi.router); 

service.get('/', (request, response) => {
    response.sendFile(__dirname + '/login_page.html');
});

service.get('/project_homepage.html', (request, response) => {
    response.sendFile(__dirname + '/project_homepage.html');
});

service.get('/project_adduser.html', (request, response) => {
    response.sendFile(__dirname + '/project_adduser.html');
});

service.get('/project_viewuser.html', (request, response) => {
    response.sendFile(__dirname + '/project_viewuser.html');
});


service.listen(
    3000,
    (error) => {
        if (error) console.error("Error occurred while starting app");
        console.log("Server started in port 3000");
    }
);