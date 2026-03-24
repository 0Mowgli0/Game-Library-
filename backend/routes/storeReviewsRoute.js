const express = require("express");
const router = express.Router();
const storeReviewService = require("../services/storeReviewService");

router.get("/", async (req, res) => {
  try {
    const reviews = await storeReviewService.getAllStoreReviews();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte hämta recensioner" });
  }
});

router.post("/", async (req, res) => {
  try {
    const review = await storeReviewService.createStoreReview(req.body);
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte skapa recension" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await storeReviewService.deleteStoreReview(req.params.id);
    res.json({ message: "Recension raderad" });
  } catch (error) {
    res.status(500).json({ message: "Kunde inte radera recension" });
  }
});

module.exports = router;