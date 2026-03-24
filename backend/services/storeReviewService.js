const { StoreReview } = require("../models");

async function getAllStoreReviews() {
  return await StoreReview.findAll({
    order: [["createdAt", "DESC"]],
  });
}

async function createStoreReview(data) {
  return await StoreReview.create(data);
}

async function deleteStoreReview(id) {
  const review = await StoreReview.findByPk(id);
  if (!review) return null;
  await review.destroy();
  return true;
}

module.exports = { getAllStoreReviews, createStoreReview, deleteStoreReview };