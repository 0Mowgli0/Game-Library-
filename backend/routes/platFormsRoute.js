const express = require("express");
const router = express.Router();
const platformService = require("../services/platFormService");

router.get("/", async (req, res) => {
  try {
    const platforms = await platformService.getAllPlatforms();
    res.json(platforms);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte hämta plattformar" });
  }
});

router.post("/", async (req, res) => {
  try {
    const platform = await platformService.createPlatform(req.body);
    res.status(201).json(platform);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte skapa plattform" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await platformService.deletePlatform(req.params.id);
    res.json({ message: "Plattform raderad" });
  } catch (error) {
    res.status(500).json({ message: "Kunde inte radera plattform" });
  }
});

module.exports = router;