const { Rating } = require("../models");

async function getRatingsByGameId(gameId) {
  return await Rating.findAll({ where: { gameId } });
}

async function getAverageRating(gameId) {
  const ratings = await Rating.findAll({ where: { gameId } });
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / ratings.length) * 10) / 10;
}

async function createRating(data) {
  return await Rating.create(data);
}

async function deleteRating(id) {
  const rating = await Rating.findByPk(id);
  if (!rating) return null;
  await rating.destroy();
  return true;
}

module.exports = { getRatingsByGameId, getAverageRating, createRating, deleteRating };