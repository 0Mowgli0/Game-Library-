module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("Cart", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return Cart;
};