import api from "./api";

const getAllGames = () => api.get("/games");
const getGameById = (id) => api.get(`/games/${id}`);
const createGame = (gameData) => api.post("/games", gameData);
const updateGame = (id, gameData) => api.put(`/games/${id}`, gameData);
const deleteGame = (id) => api.delete(`/games/${id}`);

export default {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
};