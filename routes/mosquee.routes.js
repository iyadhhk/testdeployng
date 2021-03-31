const router = require("express").Router();
const { body } = require("express-validator");
const mosquees = require("../controllers/mosquee.controller");

// Create a new Mosque
router.post(
  "/",
  [
    body("nomMosquee", "Nom de la Mosquee invalide")
      .trim()
      .isLength({ min: 3 }),
    body("adresse", "adresse invalide").trim().isLength({ min: 3 }),
    body("telephone", "telephone invalide").trim().isLength({ min: 3 }),
    body("email", "email invalide").trim().isEmail(),
  ],
  mosquees.create
);

// Retrieve all Mosques
router.get("/", mosquees.findAll);

// Retrieve a single Mosque with id
router.get("/:id", mosquees.findOne);
router.put("/addProprietaire", mosquees.addProprietaire);
router.get("/getMosqueeIdUser/:idUser", mosquees.getMosqueeIdUser);
router.put(
  "/editInfoMosque",
  [
    body("nomMosquee", "Nom de la Mosquee invalide")
      .trim()
      .isLength({ min: 3 }),
    body("adresse", "adresse invalide").trim().isLength({ min: 3 }),
    body("telephone", "telephone invalide").trim().isLength({ min: 3 }),
    body("email", "email invalide").trim().isEmail(),
    body("imamMosquee", "Imam Mosquee invalide").trim().isLength({ min: 3 }),
  ],
  mosquees.editMosquee
);
//
module.exports = router;
