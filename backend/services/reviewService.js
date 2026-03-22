const { Review } = require("../models");

async function getReviewsByGameId(gameId) {
  return await Review.findAll({ where: { gameId } });
}

async function createReview(data) {
  return await Review.create(data);
}

async function deleteReview(id) {
  const review = await Review.findByPk(id);
  if (!review) return null;
  await review.destroy();
  return true;
}

module.exports = { getReviewsByGameId, createReview, deleteReview };