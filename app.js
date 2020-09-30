const express = require("express");
const bodyparser = require("body-parser");

const connection = require("./connection");
const expenseController = require("./controller/expense-controller");
const userController = require("./controller/user-controller");

const session = require("express-session");

var app = express();

var urlparser = bodyparser.urlencoded({ extended: false });

app.set("view engine", "ejs");

app.use(urlparser);

//for sessions
app.use(
    session({
        secret: "hello-mate",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 30000 },
    })
);

// for Controllers
app.use("/", expenseController);
app.use("/user", userController);

app.listen(3000, function () {
    connection();
    console.log("Listening on port ", 3000);
});
