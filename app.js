const express = require("express");
const bodyparser = require("body-parser");

const homecontroller = require("./controllers/homecontroller");

const urlparser = bodyparser.urlencoded({ extended: false });

const app = express();

app.set("view engine", "ejs");

app.use(urlparser);
app.use(express.static("public"));
app.use("/", homecontroller);

app.listen(3000, () => console.log("Listening to port " + 3000));
