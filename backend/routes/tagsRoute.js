const express = require("express");
const router = express.Router();
const { Tag } = require("../models");
const { successResponse, errorResponse } = require("../helpers/responseHelper");

router.get("/", async (req, res) => {
  try {
    const tags = await Tag.findAll({
      order: [["name", "ASC"]],
    });

    return successResponse(res, tags, "Taggar hämtade");
  } catch (error) {
    return errorResponse(res, "Kunde inte hämta taggar", 500, error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    return successResponse(res, newTag, "Tag skapad", 201);
  } catch (error) {
    return errorResponse(res, "Kunde inte skapa tag", 500, error.message);
  }
});

module.exports = router;