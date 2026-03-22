const { Genre } = require("../models");

async function getAllGenres() {
  return await Genre.findAll({ order: [["name", "ASC"]] });
}

async function createGenre(data) {
  return await Genre.create(data);
}

async function deleteGenre(id) {
  const genre = await Genre.findByPk(id);
  if (!genre) return null;
  await genre.destroy();
  return true;
}

module.exports = { getAllGenres, createGenre, deleteGenre };