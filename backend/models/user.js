const mongoose = require("mongoose");

const User = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    accessLevel: { type: String, required: true }
});

module.exports = mongoose.model("users", User);