const express = require("express");
const router = express.Router();
const { User } = require("../models");
const { successResponse, errorResponse } = require("../helpers/responseHelper");

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      order: [["createdAt", "DESC"]],
    });

    return successResponse(res, users, "Användare hämtade");
  } catch (error) {
    return errorResponse(res, "Kunde inte hämta användare", 500, error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return errorResponse(res, "Användaren hittades inte", 404);
    }

    return successResponse(res, user, "Användare hämtad");
  } catch (error) {
    return errorResponse(res, "Kunde inte hämta användaren", 500, error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    return successResponse(res, newUser, "Användare skapad", 201);
  } catch (error) {
    return errorResponse(res, "Kunde inte skapa användare", 500, error.message);
  }
});

module.exports = router;