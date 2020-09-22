const express = require("express");
const dbConnector = require("./dbconnector");
const urlController = require("./controllers/urlcontroller");
const bodyparser = require("body-parser")

const urlparser = bodyparser.urlencoded({extended:false});


//lets make connection from here
dbConnector.makeConnection();

app = express();
app.set("view engine","ejs");
app.set("views","./views");

app.use(urlparser);

app.use("/",urlController);

app.listen(3000,()=>console.log("Lisening to port ",3000));