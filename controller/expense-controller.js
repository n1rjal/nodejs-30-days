const express = require("express");
const router = express.Router();
const expenseModel = require("../models/expense-model");

const markdown_it = require("markdown-it");

//markdown it instance
mkd = new markdown_it();

router
    .get("/", async function (req, res) {
        var expenses = await expenseModel.find();
        res.render("index", { expenses: expenses, mkd: mkd });
    })
    .post("/", async function (req, res) {
        var expense = await expenseModel(req.body).save((err) => {
            if (err) throw err;
        });
        res.redirect("/");
    });

router.get("/expense/:id", async function (req, res) {
    var exp = await expenseModel.findById(req.params.id);
    console.log(exp);
    var info = mkd.render(exp.info);
    exp !== null
        ? res.render("detail", {
              expense: exp,
              info: info,
          })
        : res.send("404 not found", 400);
});

module.exports = router;
