const mongoose = require("mongoose");

const Declaration = mongoose.model(
  "Declaration",
  new mongoose.Schema({
    nom: String,
    prenom: String,
    telephone: Number,
    email: String,
    adresse: String,
    date: Date,
    matricule: String,
    Commentaire:String,
    dateExpert: Date,
    dateDevis: Date,
    downloadRapport: String,
    files: [
    ],
    rapport: [
    ],
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    expert: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    devis: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Devis"
      }
    ],
  })
);

module.exports = Declaration;