const express = require("express");
const router = express.Router();
const expenseModel = require("../models/expense-model");

const markdown_it = require("markdown-it");

//markdown it instance
mkd = new markdown_it();

router
    .get("/", async function (req, res) {
        if (req.query.q) {
            var rx = new RegExp("^" + req.query.q, "gi");
            var expenses = await expenseModel.find({ title: rx });
            res.render("index", { expenses: expenses, mkd: mkd });
        } else {
            var expenses = await expenseModel.find();
            res.render("index", { expenses: expenses, mkd: mkd });
        }
    })
    .post("/", async function (req, res) {
        console.log(req.body);
        await expenseModel(req.body).save((err) => {
            if (err) throw err;
        });
        res.redirect("/");
    });

router.get("/expense/:id", async function (req, res) {
    var exp = await expenseModel.findById(req.params.id);
    var info = mkd.render(exp.info);
    exp !== null
        ? res.render("detail", {
              expense: exp,
              info: info,
          })
        : res.send("404 not found", 400);
});

router
    .get("/expense/:id/edit", async function (req, res) {
        var exp = await expenseModel.findById(req.params.id);

        res.render("update", { exp: exp });
    })
    .post("/expense/:id/edit", async function (req, res) {
        var exp = await expenseModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            function (err, doc) {
                if (err) throw err;
                res.redirect("/expense/" + doc._id);
            }
        );
    });

router
    .get("/expense/:id/delete", async function (req, res) {
        var exp = await expenseModel.findById(req.params.id);
        res.render("delete", { exp: exp });
    })
    .post("/expense/:id/delete", async function (req, res) {
        expenseModel.findByIdAndDelete(req.params.id, function (err, docs) {
            if (err) {
                console.log(err);
                throw err;
            } else {
                res.redirect("/");
            }
        });
    });

module.exports = router;
