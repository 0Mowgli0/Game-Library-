const express = require("express");
const router = express.Router();
const userService = require("../services/userService");

router.get("/", async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte hämta användare" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "Användaren hittades inte" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte hämta användaren" });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte skapa användare" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ message: "Användaren hittades inte" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte uppdatera användare" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.json({ message: "Användare raderad" });
  } catch (error) {
    res.status(500).json({ message: "Kunde inte radera användare" });
  }
});

module.exports = router;