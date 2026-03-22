module.exports = (sequelize, DataTypes) => {
  const Platform = sequelize.define("Platform", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Platform;
};