const express = require("express");
const router = express.Router();
const discountService = require("../services/discountService");

router.get("/validate/:code", async (req, res) => {
  try {
    const discount = await discountService.validateDiscount(req.params.code);
    if (!discount) {
      return res.status(404).json({ message: "Ogiltig eller inaktiv rabattkod" });
    }
    res.json({ code: discount.code, percentage: discount.percentage });
  } catch (error) {
    res.status(500).json({ message: "Kunde inte validera rabattkod" });
  }
});

router.get("/", async (req, res) => {
  try {
    const discounts = await discountService.getAllDiscounts();
    res.json(discounts);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte hämta rabattkoder" });
  }
});

router.post("/", async (req, res) => {
  try {
    const discount = await discountService.createDiscount(req.body);
    res.status(201).json(discount);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte skapa rabattkod" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await discountService.deleteDiscount(req.params.id);
    res.json({ message: "Rabattkod raderad" });
  } catch (error) {
    res.status(500).json({ message: "Kunde inte radera rabattkod" });
  }
});

module.exports = router;