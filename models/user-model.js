const mongoose = require("mongoose");

userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userModel = mongoose.model("User", userSchema);

module.exports = userModel;
