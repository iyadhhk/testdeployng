const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const path = require("path");

const jwtSecret = config.get("jwtSecret");

const { validationResult } = require("express-validator");
const User = require("../models/User");
exports.createProprietaire = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const {
      nomAssociation,
      nomPresidentAssociation,
      prenom,
      adresse,
      ville,
      codePostal,
      pays,
      telephone,
      email,
      siteInternet,
      password,
      page,
      link,
    } = req.body;
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      const error = Error("email already exists");
      (error.statusCode = 409),
        (error.data = [{ param: "email", msg: "email existe" }]);
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const pageRéseauSociaux = [{ page, link }];
    const user = new User({
      nomAssociation,
      nomPresidentAssociation,
      prenom,
      adresse,
      ville,
      codePostal,
      pays,
      telephone,
      email,
      siteInternet,
      password: hashedPassword,
      pageRéseauSociaux,
    });
    const createdUser = await user.save();

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      jwtSecret,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      token,
      message: "proprietaire created",
      userId: createdUser._id,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteProprietaire = async (req, res, next) => {
  try {
    const { idProprietaire } = req.body;

    const response = await User.findOneAndDelete({ _id: idProprietaire });
    if (!response) {
      const error = new Error("No proprietaire");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

exports.getAllProprietaire = async (req, res, next) => {
  try {
    const users = await User.find({ role: "propriétaire" });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
