const express = require("express");
const router = express.Router();
const gameService = require("../services/gameService");

router.get("/", async (req, res) => {
  try {
    const games = await gameService.getAllGames();
    res.json(games);
  } catch (error) {
    console.error("Fel vid hämtning av spel:", error);
    res.status(500).json({ message: "Kunde inte hämta spel" });
  }
});

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

module.exports = router;