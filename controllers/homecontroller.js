const { json } = require("body-parser");
const express = require("express");
const fetch = require("node-fetch");

router = express();

router.get("/", (req, res) => {
  res.render("index", { data: false });
});

router.get("/user", (req, res) => {
  if (req.query.username) {
    // var username = req.query.username;
    // var url = `https://api.github.com/users/${username}`;
    // fetch(url)
    // .then((res) => res.json())
    // .then((data) => {
    // console.log(data);

    res.render("user");
    // });
  } else {
    res.send("Please provide username as user in GET parameters");
  }
});

module.exports = router;
