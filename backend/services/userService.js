const { User } = require("../models");

async function getAllUsers() {
  return await User.findAll();
}

async function getUserById(id) {
  return await User.findByPk(id);
}

async function createUser(data) {
  return await User.create(data);
}

async function updateUser(id, data) {
  const user = await User.findByPk(id);
  if (!user) return null;
  await user.update(data);
  return user;
}

async function deleteUser(id) {
  const user = await User.findByPk(id);
  if (!user) return null;
  await user.destroy();
  return true;
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };