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

const getRatingsByGameId = (gameId) => api.get(`/ratings/${gameId}`);
const createRating = (ratingData) => api.post("/ratings", ratingData);

const getCart = (userId) => api.get(`/cart/${userId}`);
const addToCart = (userId, gameId, amount) => api.post("/cart/add", { userId, gameId, amount });
const removeFromCart = (userId, gameId) => api.delete("/cart/remove", { data: { userId, gameId } });
const clearCart = (userId) => api.delete(`/cart/clear/${userId}`);
const payCart = (userId) => api.post(`/cart/pay/${userId}`);

const getAllUsers = () => api.get("/users");

const getOrderHistory = (userId) => api.get(`/cart/orders/${userId}`);
const validateDiscount = (code) => api.get(`/discounts/validate/${code}`);

export default {
  getAllGames,
  validateDiscount,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
  getAllPlatforms,
  getAllGenres,
  getReviewsByGameId,
  createReview,
  deleteReview,
  getRatingsByGameId,
  createRating,
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
  payCart,
  getAllUsers,
  getOrderHistory,
};