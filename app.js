const express = require("express");
const multer = require("multer");
const bodyparser = require("body-parser");

const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, "/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + " - " + Date.now());
  },
});

const photoupload = multer({ storage: storage });

const urlencoded = bodyparser.urlencoded({ extended: false });

const app = express();
app.use(urlencoded);

app.use(express.static("uploads"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/", photoupload.single("avatar"), (req, res) => {
  console.log(req.file);
  res.send();
});

app.listen(3000, () => console.log("listening on port 3000"));
