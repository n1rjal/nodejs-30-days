const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model");

router
    .get("/", (req, res) => {
        res.render("user/usercreate");
    })
    .post("/", (req, res) => {
        console.log(req.body);
        res.redirect("/");
    });

module.exports = router;
