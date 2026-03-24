module.exports = (sequelize, DataTypes) => {
  const Discount = sequelize.define("Discount", {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    percentage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  return Discount;
};