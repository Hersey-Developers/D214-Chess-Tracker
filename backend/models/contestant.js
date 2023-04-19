const mongoose = require("mongoose");

const Contestant = mongoose.Schema({
  name: String,
  active: { type: Boolean, default: true, required: true },
});

module.exports = mongoose.model("contestants", Contestant);
