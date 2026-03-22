const express = require("express");
const router = express.Router();
const reviewService = require("../services/reviewService");

router.get("/:gameId", async (req, res) => {
  try {
    const reviews = await reviewService.getReviewsByGameId(req.params.gameId);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte hämta recensioner" });
  }
});

router.post("/", async (req, res) => {
  try {
    const review = await reviewService.createReview(req.body);
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte skapa recension" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await reviewService.deleteReview(req.params.id);
    res.json({ message: "Recension raderad" });
  } catch (error) {
    res.status(500).json({ message: "Kunde inte radera recension" });
  }
});

module.exports = router;