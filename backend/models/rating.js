module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define("Rating", {
    gameId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  });

  return Rating;
};