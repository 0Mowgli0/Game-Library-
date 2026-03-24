const { Discount } = require("../models");

async function validateDiscount(code) {
  const discount = await Discount.findOne({
    where: { code: code.toUpperCase(), active: true },
  });

  if (!discount) return null;
  return discount;
}

async function getAllDiscounts() {
  return await Discount.findAll();
}

async function createDiscount(data) {
  return await Discount.create({
    ...data,
    code: data.code.toUpperCase(),
  });
}

async function deleteDiscount(id) {
  const discount = await Discount.findByPk(id);
  if (!discount) return null;
  await discount.destroy();
  return true;
}

module.exports = { validateDiscount, getAllDiscounts, createDiscount, deleteDiscount };