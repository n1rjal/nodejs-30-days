const mongoose = require("mongoose");

var expenseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    spent: {
        type: Number,
        required: true,
    },
    info: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true,
    },
});

var expenseModel = mongoose.model("expense", expenseSchema);

module.exports = expenseModel;
