const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nomAssociation: {
    type: String,
    // required: true,
  },
  nomPresidentAssociation: {
    type: String,
  },
  prenom: {
    type: String,
  },
  adresse: {
    type: String,
  },
  ville: {
    type: String,
  },
  codePostal: {
    type: String,
  },
  pays: {
    type: String,
  },
  telephone: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  siteInternet: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  pageRéseauSociaux: [{ page: { type: String }, link: { type: String } }],

  role: {
    type: String,
    default: "propriétaire",
  },
});

module.exports = mongoose.model("User", UserSchema);
