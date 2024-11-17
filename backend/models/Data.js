const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  name: String,
  description: String,
  country: String,
});

module.exports = mongoose.model("Data", dataSchema);
