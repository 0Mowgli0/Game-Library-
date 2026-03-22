const { Game, Platform, Genre } = require("../models");

async function getAllGames() {
  return await Game.findAll({
    include: [
      { model: Platform },
      { model: Genre },
    ],
    order: [["createdAt", "DESC"]],
  });
}

async function getGameById(id) {
  return await Game.findByPk(id, {
    include: [
      { model: Platform },
      { model: Genre },
    ],
  });
}

async function createGame(gameData) {
  return await Game.create(gameData);
}

async function updateGame(id, gameData) {
  const game = await Game.findByPk(id);
  if (!game) return null;
  await game.update(gameData);
  return game;
}

async function deleteGame(id) {
  const game = await Game.findByPk(id);
  if (!game) return null;
  await game.destroy();
  return true;
}

module.exports = {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
};