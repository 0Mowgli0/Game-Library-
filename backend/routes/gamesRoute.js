const express = require("express");
const router = express.Router();
const gameService = require("../services/gameService");

// GET ALL
router.get("/", async (req, res) => {
  try {
    const games = await gameService.getAllGames();
    res.json(games);
  } catch (error) {
    console.error("Fel vid hämtning av spel:", error);
    res.status(500).json({ message: "Kunde inte hämta spel" });
  }
});

// GET ONE
router.get("/:id", async (req, res) => {
  try {
    const game = await gameService.getGameById(req.params.id);

    if (!game) {
      return res.status(404).json({ message: "Spelet hittades inte" });
    }

    res.json(game);
  } catch (error) {
    console.error("Fel vid hämtning av spel:", error);
    res.status(500).json({ message: "Kunde inte hämta spelet" });
  }
});

// CREATE
router.post("/", async (req, res) => {
  try {
    const newGame = await gameService.createGame(req.body);
    res.status(201).json(newGame);
  } catch (error) {
    console.error("Fel vid skapande:", error);
    res.status(500).json({ message: "Kunde inte skapa spel" });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedGame = await gameService.updateGame(
      req.params.id,
      req.body
    );

    res.json(updatedGame);
  } catch (error) {
    console.error("Fel vid uppdatering:", error);
    res.status(500).json({ message: "Kunde inte uppdatera spel" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await gameService.deleteGame(req.params.id);
    res.json({ message: "Spelet raderat" });
  } catch (error) {
    console.error("Fel vid radering:", error);
    res.status(500).json({ message: "Kunde inte radera spel" });
  }
});

module.exports = router;