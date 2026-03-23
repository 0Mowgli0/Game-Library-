const express = require("express");
const router = express.Router();
const cartService = require("../services/cartService");

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