const { Cart, CartRow, Game } = require("../models");

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

module.exports = {
  getCartByUserId,
  addToCart,
  removeFromCart,
  clearCart,
  payCart,
  getOrderHistory,
};