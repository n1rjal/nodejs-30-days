const mongoose = require("mongoose");

var connect = () => {
    mongoose
        .connect("mongodb://localhost/expenseTracker", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(console.log("Connected to Database"))
        .catch((err) => {
            console.log(err);
            if (err) throw err;
        });
};

module.exports = connect;
