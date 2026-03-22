const express = require("express");
const router = express.Router();
const genreService = require("../services/genreService");

router.get("/", async (req, res) => {
  try {
    const genres = await genreService.getAllGenres();
    res.json(genres);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte hämta genres" });
  }
});

router.post("/", async (req, res) => {
  try {
    const genre = await genreService.createGenre(req.body);
    res.status(201).json(genre);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte skapa genre" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await genreService.deleteGenre(req.params.id);
    res.json({ message: "Genre raderad" });
  } catch (error) {
    res.status(500).json({ message: "Kunde inte radera genre" });
  }
});

module.exports = router;