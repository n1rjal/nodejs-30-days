const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");

app = express();

urlparser = bodyparser.urlencoded({ extended: false });

app.set("view engine", "ejs");
app.use(urlparser);

app.get("/", (req, res) => {
    res.render("sendform.ejs");
}).post("/", (req, res) => {
    var nodemailer = require("nodemailer");

    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "",
            pass: "",
        },
    });

    const mailOptions = {
        from: "dajngoman@gmail.com",
        to: "nirjalpaudel54312@gmail.com",
        subject: "Maailing using nodejs",
        html: req.body.msg,
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) console.log(err);
        else {
            console.log(info);
            res.send("EMAIL SENT");
        }
    });
});

app.listen(3000, () => {
    console.log("Listening to port ", 3000);
});
