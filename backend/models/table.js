const mongoose = require("mongoose");

const Table = mongoose.Schema({
    tableNum: Number,
    contestant1: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    contestant2: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    userWhoWon: { type: Number, default: 0 }
});

module.exports = mongoose.model("tables", Table);