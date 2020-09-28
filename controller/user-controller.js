const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

const regitser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function (err, hashedPassword) {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.send(errors);
        }
        if (err) {
            res.send("Error occured");
        }
        var user = new userModel({
            username: req.body.username,
            password: hashedPassword,
        });
        user.save()
            .then((user) => {
                res.send("Signed In Succesfully");
            })
            .catch((err) => {
                res.send("An error Occured" + err);
            });
    });
};

const auth = async (req, res, next) => {
    await userModel.findOne({ username: req.body.username }).then((user) => {
        console.log("user => ", user);
        if (!user) {
            res.send("No user Found");
        } else {
            bcrypt
                .compare(req.body.password, user.password)
                .then((result) => {
                    if (result) {
                        res.send(
                            "Passowrd and username is valid. You will be signed in as " +
                                user.username
                        );
                    }
                    res.send("Password not matched");
                })
                .catch((err) => {
                    console.log("An err occured " + err);
                });
        }
    });
};

router
    .get("/create", (req, res) => {
        res.render("user/usercreate");
    })
    .post(
        "/create",
        [
            body("username").trim().isLength({ min: 8 }),
            body("password").isLength({ min: 8 }),
        ],
        regitser
    );

router
    .get("/login", (req, res) => {
        res.render("user/userlogin");
    })
    .post("/login", auth);

module.exports = router;
