const express = require("express");
const router = express.Router();
const postService = require("../services/postService");
const { successResponse, errorResponse } = require("../helpers/responseHelper");

router.get("/", async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    return successResponse(res, posts, "Inlägg hämtade");
  } catch (error) {
    return errorResponse(res, "Kunde inte hämta inlägg", 500, error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);

    if (!post) {
      return errorResponse(res, "Inlägget hittades inte", 404);
    }

    return successResponse(res, post, "Inlägg hämtat");
  } catch (error) {
    return errorResponse(res, "Kunde inte hämta inlägget", 500, error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const newPost = await postService.createPost(req.body);
    return successResponse(res, newPost, "Inlägg skapat", 201);
  } catch (error) {
    return errorResponse(res, "Kunde inte skapa inlägg", 500, error.message);
  }
});

module.exports = router;