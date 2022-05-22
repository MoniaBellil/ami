const mongoose = require("mongoose");

const Devis = mongoose.model(
  "Devis",
  new mongoose.Schema({
    url: String,
    createdAt: Date
  })
);

module.exports = Devis;