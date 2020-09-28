const mongoose = require("mongoose");

userSchema = mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        expenses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Expense",
            },
        ],
    },
    { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
