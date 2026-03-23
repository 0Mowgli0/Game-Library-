module.exports = (sequelize, DataTypes) => {
  const CartRow = sequelize.define("CartRow", {
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gameId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  });

  return CartRow;
};