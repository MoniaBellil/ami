const mongoose = require("mongoose");

const Rapport = mongoose.model(
  "Rapport",
  new mongoose.Schema({
    url: String,
    createdAt: Date
  })
);

module.exports = Rapport;