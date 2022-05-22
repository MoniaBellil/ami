const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    nom: String,
    prenom: String,
    telephone: Number,
    email: String,
    password: { type: String, select: false },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;
