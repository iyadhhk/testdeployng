const Mosquee = require("../models/Mosquee.model");
const { validationResult } = require("express-validator");

const clearImage = require("../utils/clearImage");

// Create and Save a new Mosquee
exports.create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    let imageUrl = req.file.path.replace("\\", "/");
    const mosquee = new Mosquee({
      nomMosquee: req.body.nomMosquee,
      adresse: req.body.adresse,
      telephone1: req.body.telephone1,

      telephone: req.body.telephone,
      email: req.body.email,
      facebook: req.body.facebook,
      imageUrl,
      ouvertureMosquee: req.body.ouvertureMosquee,
      commentaire: req.body.commentaire,
      imamMosquee: req.body.imamMosquee,
      nomGestionnaire: req.body.nomGestionnaire,
      sallePriereFemmes: req.body.sallePriereFemmes,
      mosqueeSallePriere: req.body.mosqueeSallePriere,
      fermetureExeptionnelle: req.body.fermetureExeptionnelle,
      evenements: req.body.evenements,
      siteWeb: req.body.siteWeb,
      associationMosquee: req.body.associationMosquee,
      lat: req.body.lat,
      lng: req.body.lng,
      openingHours: req.body.openingHours,
      municipality: req.body.municipality,
    });

    await mosquee.save(mosquee);
    res.status(200).json(mosquee);
  } catch (error) {
    next(error);
  }
};

// Retrieve all Mosquees from the database.
exports.findAll = async (req, res, next) => {
  try {
    const mosqueList = await Mosquee.find();
    res.status(200).json(mosqueList);
  } catch (error) {
    next(error);
  }
};

// Find a single Mosquee with an id
exports.findOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const foundMosque = await Mosquee.findById(id);
    if (!foundMosque) {
      const error = new Error("Mosque not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(foundMosque);
  } catch (error) {
    next(error);
  }
};
//add proprietaire for each mosquee
exports.addProprietaire = async (req, res, next) => {
  try {
    const { idUser, idMosquee } = req.body;
    const foundMosquee = await Mosquee.findOne({ _id: idMosquee });
    if (!foundMosquee) {
      const error = new Error("Mosque not found");
      error.statusCode = 404;
      throw error;
    } else {
      foundMosquee.user = idUser;
      await foundMosquee.save();
      res.status(201).json(foundMosquee);
    }
  } catch (err) {
    next(err);
  }
};
//get mosquee by id user
exports.getMosqueeIdUser = async (req, res, next) => {
  try {
    const { idUser } = req.params;
    const foundMosqueeIdUser = await Mosquee.find({ user: idUser });
    if (!foundMosqueeIdUser) {
      res.status(404).json({ msg: "user not found" });
    }
    res.status(201).json(foundMosqueeIdUser);
  } catch (error) {
    next(error);
  }
};
//edit mosquee by id user
exports.editMosquee = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    let imgs;

    const {
      user,
      idMosque,
      nomMosquee,
      adresse,
      telephone,
      telephone1,
      email,
      facebook,
      imageUrl,
      ouvertureMosquee,
      commentaire,
      imamMosquee,
      nomGestionnaire,
      sallePriereFemmes,
      mosqueeSallePriere,
      fermetureExeptionnelle,
    } = req.body;
    if (req.file) {
      imgs = req.file.path.replace("\\", "/");
      clearImage(imageUrl, "..");
    } else {
      imgs = imageUrl;
    }

    const newMosqueeInfo = {
      user,
      nomMosquee,
      adresse,
      telephone,
      telephone1,

      email,
      facebook,
      imageUrl: imgs,
      ouvertureMosquee,
      commentaire,
      imamMosquee,
      nomGestionnaire,
      sallePriereFemmes,
      mosqueeSallePriere,
      fermetureExeptionnelle,
    };

    let editMosqueeIdUser = await Mosquee.findOneAndUpdate(
      { _id: idMosque },
      {
        ...newMosqueeInfo,
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
        useFindAndModify: false,
      }
    );
    return res.status(200).json(editMosqueeIdUser);
  } catch (error) {
    next(error);
  }
};
