const mongoose = require("mongoose");

const Table = mongoose.Schema({
    tableNum: Number,
    contestant1: { type: String },
    contestant2: { type: String },
    userWhoWon: { type: Number, default: 0 }
});

module.exports = mongoose.model("tables", Table);