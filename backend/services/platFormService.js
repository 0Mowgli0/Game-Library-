const { Platform } = require("../models");

async function getAllPlatforms() {
  return await Platform.findAll({ order: [["name", "ASC"]] });
}

async function createPlatform(data) {
  return await Platform.create(data);
}

async function deletePlatform(id) {
  const platform = await Platform.findByPk(id);
  if (!platform) return null;
  await platform.destroy();
  return true;
}

module.exports = { getAllPlatforms, createPlatform, deletePlatform };