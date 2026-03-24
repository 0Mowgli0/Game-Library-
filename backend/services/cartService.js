const { Cart, CartRow, Game, Platform, Genre } = require("../models");
const { Op } = require("sequelize");

async function getOrCreateCart(userId) {
  const [cart] = await Cart.findOrCreate({
    where: { userId, payed: false },
    defaults: { userId, payed: false },
  });
  return cart;
}

async function getCartByUserId(userId) {
  const cart = await Cart.findOne({
    where: { userId, payed: false },
    include: [{ model: Game, through: { attributes: ["amount"] } }],
  });

  if (!cart) return { games: [], total: 0 };

  const games = cart.Games.map((game) => ({
    id: game.id,
    title: game.title,
    price: game.price,
    image: game.image,
    amount: game.CartRow.amount,
    subtotal: game.price * game.CartRow.amount,
  }));

  const total = games.reduce((acc, g) => acc + g.subtotal, 0);
  return { cartId: cart.id, games, total };
}

async function addToCart(userId, gameId, amount) {
  const cart = await getOrCreateCart(userId);

  const existing = await CartRow.findOne({
    where: { cartId: cart.id, gameId },
  });

  if (existing) {
    await existing.update({ amount: existing.amount + amount });
  } else {
    await CartRow.create({ cartId: cart.id, gameId, amount });
  }

  return getCartByUserId(userId);
}

async function removeFromCart(userId, gameId) {
  const cart = await Cart.findOne({ where: { userId, payed: false } });
  if (!cart) return null;
  await CartRow.destroy({ where: { cartId: cart.id, gameId } });
  return getCartByUserId(userId);
}

async function clearCart(userId) {
  const cart = await Cart.findOne({ where: { userId, payed: false } });
  if (!cart) return null;
  await CartRow.destroy({ where: { cartId: cart.id } });
  return true;
}

async function payCart(userId) {
  const cart = await Cart.findOne({
    where: { userId, payed: false },
    include: [{ model: Game, through: { attributes: ["amount"] } }],
  });

  if (!cart) return null;

  const games = cart.Games.map((game) => ({
    id: game.id,
    title: game.title,
    price: game.price,
    image: game.image,
    amount: game.CartRow.amount,
    subtotal: game.price * game.CartRow.amount,
  }));

  const total = games.reduce((acc, g) => acc + g.subtotal, 0);
  await cart.update({ payed: true });

  return { cartId: cart.id, games, total };
}

async function getOrderHistory(userId) {
  const orders = await Cart.findAll({
    where: { userId, payed: true },
    include: [{ model: Game, through: { attributes: ["amount"] } }],
    order: [["updatedAt", "DESC"]],
  });

  return orders.map((order) => {
    const games = order.Games.map((game) => ({
      id: game.id,
      title: game.title,
      price: game.price,
      image: game.image,
      amount: game.CartRow.amount,
      subtotal: game.price * game.CartRow.amount,
    }));
    const total = games.reduce((acc, g) => acc + g.subtotal, 0);
    return {
      orderId: order.id,
      date: order.updatedAt,
      games,
      total,
    };
  });
}

async function getRecommendations(userId) {
  const cart = await Cart.findOne({
    where: { userId, payed: false },
    include: [{ model: Game, through: { attributes: ["amount"] } }],
  });

  if (!cart || cart.Games.length === 0) {
    // Om varukorgen är tom, returnera slumpmässiga spel
    const randomGames = await Game.findAll({
      include: [{ model: Platform }, { model: Genre }],
      order: [["createdAt", "DESC"]],
      limit: 4,
    });
    return randomGames;
  }

  // Hämta genres och ids från spel i varukorgen
  const cartGameIds = cart.Games.map((g) => g.id);
  const cartGenreIds = cart.Games
    .map((g) => g.genreId)
    .filter((id) => id !== null);

  // Hitta unika genres
  const uniqueGenreIds = [...new Set(cartGenreIds)];

  // Hämta spel med samma genre som INTE redan finns i varukorgen
  const recommendations = await Game.findAll({
    where: {
      id: { [Op.notIn]: cartGameIds },
      genreId: { [Op.in]: uniqueGenreIds.length > 0 ? uniqueGenreIds : [0] },
    },
    include: [{ model: Platform }, { model: Genre }],
    limit: 4,
  });

  // Om inte tillräckligt med rekommendationer, fyll på med andra spel
  if (recommendations.length < 4) {
    const extraGames = await Game.findAll({
      where: {
        id: {
          [Op.notIn]: [
            ...cartGameIds,
            ...recommendations.map((g) => g.id),
          ],
        },
      },
      include: [{ model: Platform }, { model: Genre }],
      limit: 4 - recommendations.length,
    });
    return [...recommendations, ...extraGames];
  }

  return recommendations;
}

module.exports = {
  getCartByUserId,
  addToCart,
  removeFromCart,
  clearCart,
  payCart,
  getOrderHistory,
  getRecommendations,
};