const proprietaire = require("../controllers/proprietaire.controller");
const { body } = require("express-validator");

const router = require("express").Router();

// Create a new proprietaire
router.post(
  "/create",
  [
    body("email", "email invalide").trim().isEmail(),
    body("password", "mot de passe invalide").trim().isLength({ min: 3 }),
  ],
  proprietaire.createProprietaire
);
router.put("/delete", proprietaire.deleteProprietaire);
router.get("/getProprietaire", proprietaire.getAllProprietaire);

module.exports = router;
