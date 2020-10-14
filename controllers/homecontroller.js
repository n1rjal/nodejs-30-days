const { json } = require("body-parser");
const express = require("express");
const fetch = require("node-fetch");

router = express();

const genQR = (data) => {
  var url = new URL("https://api.qrserver.com/v1/create-qr-code/");
  url.searchParams.set("size", "50x50");
  url.searchParams.set("data", data);
  return url;
};

router.get("/", (req, res) => {
  res.render("index", { data: false });
});

router.get("/user", (req, res) => {
  if (req.query.username) {
    var username = req.query.username;
    var url = `https://api.github.com/users/${username}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        res.render("user", { data: data, qr: genQR(data.html_url) });
      });
  } else {
    res.send("Please provide username as user in GET parameters");
  }
});

module.exports = router;
