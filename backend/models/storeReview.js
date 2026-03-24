module.exports = (sequelize, DataTypes) => {
  const StoreReview = sequelize.define("StoreReview", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return StoreReview;
};