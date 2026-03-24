const express = require("express");
const router = express.Router();
const cartService = require("../services/cartService");

router.get("/recommendations/:userId", async (req, res) => {
  try {
    const recommendations = await cartService.getRecommendations(req.params.userId);
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte hämta rekommendationer" });
  }
});

router.get("/orders/:userId", async (req, res) => {
  try {
    const orders = await cartService.getOrderHistory(req.params.userId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte hämta orderhistorik" });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const cart = await cartService.getCartByUserId(req.params.userId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte hämta varukorg" });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { userId, gameId, amount } = req.body;
    const cart = await cartService.addToCart(userId, gameId, amount || 1);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte lägga till i varukorg" });
  }
});

router.post("/pay/:userId", async (req, res) => {
  try {
    const order = await cartService.payCart(req.params.userId);
    if (!order) return res.status(404).json({ message: "Ingen aktiv varukorg" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte genomföra betalning" });
  }
});

router.delete("/remove", async (req, res) => {
  try {
    const { userId, gameId } = req.body;
    const cart = await cartService.removeFromCart(userId, gameId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte ta bort från varukorg" });
  }
});

router.delete("/clear/:userId", async (req, res) => {
  try {
    await cartService.clearCart(req.params.userId);
    res.json({ message: "Varukorgen tömd" });
  } catch (error) {
    res.status(500).json({ message: "Kunde inte tömma varukorgen" });
  }
});

module.exports = router;