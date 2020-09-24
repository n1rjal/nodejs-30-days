const express = require("express");
const bodyparser = require("body-parser");

const connection = require("./connection");
const expenseController = require("./controller/expense-controller");

var app = express();
var urlparser = bodyparser.urlencoded({ extended: false });

app.set("view engine", "ejs");

app.use(urlparser);
app.use("/", expenseController);

app.listen(3000, function () {
    connection();
    console.log("Listening on port ", 3000);
});
