import api from "./api";

const getAllGames = () => api.get("/games");
const getGameById = (id) => api.get(`/games/${id}`);
const createGame = (gameData) => api.post("/games", gameData);
const updateGame = (id, gameData) => api.put(`/games/${id}`, gameData);
const deleteGame = (id) => api.delete(`/games/${id}`);

const getAllPlatforms = () => api.get("/platforms");
const getAllGenres = () => api.get("/genres");

const getReviewsByGameId = (gameId) => api.get(`/reviews/${gameId}`);
const createReview = (reviewData) => api.post("/reviews", reviewData);
const deleteReview = (id) => api.delete(`/reviews/${id}`);

export default {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
  getAllPlatforms,
  getAllGenres,
  getReviewsByGameId,
  createReview,
  deleteReview,
};