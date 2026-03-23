const express = require("express");
const router = express.Router();
const ratingService = require("../services/ratingService");

router.get("/:gameId", async (req, res) => {
  try {
    const ratings = await ratingService.getRatingsByGameId(req.params.gameId);
    const average = await ratingService.getAverageRating(req.params.gameId);
    res.json({ ratings, average });
  } catch (error) {
    res.status(500).json({ message: "Kunde inte hämta betyg" });
  }
});

router.post("/", async (req, res) => {
  try {
    const rating = await ratingService.createRating(req.body);
    res.status(201).json(rating);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte skapa betyg" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await ratingService.deleteRating(req.params.id);
    res.json({ message: "Betyg raderat" });
  } catch (error) {
    res.status(500).json({ message: "Kunde inte radera betyg" });
  }
});

module.exports = router;