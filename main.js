const express = require("express");
const user = require("./apis/user");
const service = express();
service.use(express.json());

service.use("/user", user.router);
// service.use("/account", account.router);

service.listen(
    3000,
    (error) => {
        if (error) {
            console.error("Error occurred while starting service");
        } else {
            console.log("Server started in port 3000");
        }
    }
);