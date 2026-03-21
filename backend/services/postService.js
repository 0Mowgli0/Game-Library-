const { Post, User, Tag, Comment } = require("../models");

async function getAllPosts() {
  return await Post.findAll({
    include: [
      { model: User, attributes: ["id", "username", "email"] },
      { model: Tag, through: { attributes: [] } },
      { model: Comment },
    ],
    order: [["createdAt", "DESC"]],
  });
}

async function getPostById(id) {
  return await Post.findByPk(id, {
    include: [
      { model: User, attributes: ["id", "username", "email"] },
      { model: Tag, through: { attributes: [] } },
      { model: Comment },
    ],
  });
}

async function createPost(postData) {
  return await Post.create(postData);
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
};