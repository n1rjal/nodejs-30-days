const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const regitser = (req, res, next) => {
    if (req.session.user) {
        res.redirect("/");
    }
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
                var token = jwt.sign(
                    { _id: user._id, name: user.username },
                    "lets keep it secret"
                );

                res.send({ token: token });
            })
            .catch((err) => {
                res.send("An error Occured" + err);
            });
    });
};

const auth = async (req, res, next) => {
    if (req.session.user) {
        res.redirect("/");
    }
    await userModel.findOne({ username: req.body.username }).then((user) => {
        if (!user) {
            res.send("No user Found");
        } else {
            bcrypt
                .compare(req.body.password, user.password)
                .then((result) => {
                    if (result) {
                        console.log(req.session);
                        req.session.user = user;
                        res.redirect("/");
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
        console.log(req.session.user);

        if (req.session.user) {
            res.redirect("/");
        }
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
        console.log(req.session.user);
        if (req.session.user) {
            res.redirect("/");
        }
        res.render("user/userlogin");
    })
    .post("/login", auth);

router.get("/logout", (req, res) => {
    req.session.user = null;
    res.redirect("/");
});

module.exports = router;
