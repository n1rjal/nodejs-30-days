const urlModel = require("../models/urlmodel");
const express = require("express");
const router = express.Router()


router.get("/",async function(req,res){
    var objs = await urlModel.find();
    res.render("index",{"urls":objs});
});
router.post("/",async function(req,res){
    var U = new urlModel(req.body);
    await U.save(function(err,URL){
        if (err) throw err;

    });
    res.redirect("/");
});

router.get("/:url",async function(req,res){
    var surl = req.params.url;
    var obj = await urlModel.findById({"_id":surl});
    if (obj === null){
        res.send("404 not found");
    }else{
        res.redirect(obj.url);
    }

});

module.exports = router;