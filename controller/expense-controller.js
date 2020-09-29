const express = require("express");
const router = express.Router();
const expenseModel = require("../models/expense-model");
const { body, validationResult } = require("express-validator");

const markdown_it = require("markdown-it");

//markdown it instance
mkd = new markdown_it();
var total = 0;

router
    .get("/", async function (req, res) {
        if (req.query.q) {
            var rx = new RegExp("^" + req.query.q, "gi");
            var expenses = await expenseModel.find({ title: rx });
            res.render("expense/index", { expenses: expenses, mkd: mkd });
        } else {
            var expenses = await expenseModel.find();
            res.render("expense/index", { expenses: expenses, mkd: mkd });
        }
    })
    .post(
        "/",
        [
            body("spent")
                .isInt()
                .withMessage("Money spent must be a Integer")
                .custom((value) => {
                    if (value < 0) {
                        throw new Error("Lol, you should have spent something");
                    }
                    return true;
                }),
            body("date")
                .isDate()
                .toDate()
                .withMessage("Please provide a valid Date")
                .custom((date, { req }) => {
                    var currdate = new Date();
                    var deltaTime = Math.abs(currdate - date);
                    console.log("Delta time ", deltaTime);
                    if (deltaTime > 0) {
                        throw new Error(
                            `How did you spent ${req.body.spent} in future`
                        );
                    }
                    return true;
                }),
        ],
        async function (req, res) {
            var errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.send(errors);
            }
            await expenseModel(req.body).save((err) => {
                if (err) throw err;
            });
            res.redirect("/");
        }
    );

router.get("/expense/:id", async function (req, res) {
    var exp = await expenseModel.findById(req.params.id);
    var info = mkd.render(exp.info);
    exp !== null
        ? res.render("expense/detail", {
              expense: exp,
              info: info,
          })
        : res.send("404 not found", 400);
});

router
    .get(
        "/expense/:id/edit",

        async function (req, res) {
            var exp = await expenseModel.findById(req.params.id);
            res.render("expense/update", { exp: exp });
        }
    )
    .post(
        "/expense/:id/edit",
        [
            body("spent")
                .isInt()
                .withMessage("Money spent must be a Integer")
                .custom((value) => {
                    if (value < 0) {
                        throw new Error("Lol, you should have spent something");
                    }
                    return true;
                }),
        ],
        async function (req, res) {
            var errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.send(errors);
            }
            var exp = await expenseModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                function (err, doc) {
                    if (err) throw err;
                    res.redirect("/expense/" + doc._id);
                }
            );
        }
    );

router
    .get("/expense/:id/delete", async function (req, res) {
        var exp = await expenseModel.findById(req.params.id);
        res.render("expense/delete", { exp: exp });
    })
    .post(
        "/expense/:id/delete",
        [
            [
                body("spent")
                    .isInt()
                    .withMessage("Money spent must be a Integer")
                    .custom((value) => {
                        if (value < 0) {
                            throw new Error(
                                "Lol, you should have spent something"
                            );
                        }
                        return true;
                    }),
            ],
        ],
        async function (req, res) {
            expenseModel.findByIdAndDelete(req.params.id, function (err, docs) {
                if (err) {
                    console.log(err);
                    throw err;
                } else {
                    res.redirect("/");
                }
            });
        }
    );

module.exports = router;
