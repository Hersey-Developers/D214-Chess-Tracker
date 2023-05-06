const mongoose = require("mongoose");

const Match = mongoose.Schema({
    name: { type: String, required: false },
    round: { type: Number, required: false }
})

module.exports = mongoose.model("matches", Match);