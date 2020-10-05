const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../../models/usermodel");
const { validationResult } = require("express-validator");

const signIn = async (req, res, next) => {
    var errors = validationResult(req);
    if (req.user) {
        res.status(400).send({ err: "Already signed in" });
    }
    if (!errors.isEmpty()) {
        res.status(400).send(errors);
    } else {
        const user = await userModel.findOne({ username: req.body.username });
        bcrypt
            .compare(req.body.password, user.password)
            .then((result) => {
                if (result) {
                    const token = jwt.sign(
                        {
                            username: user.username,
                            id: user.id,
                        },
                        "secretkey",
                        { expiresIn: "1h" }
                    );
                    res.send({
                        success: "loggedin",
                        token: token,
                        user_id: user.id,
                        user: user.username,
                    });
                } else {
                    res.status(400).send({
                        error: "Password doesnot match",
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send({ error: err });
            });
    }
};

module.exports = signIn;
