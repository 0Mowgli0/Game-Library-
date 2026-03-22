const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.js").development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: false,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Game = require("./game")(sequelize, DataTypes);
db.Platform = require("./platform")(sequelize, DataTypes);
db.Genre = require("./genre")(sequelize, DataTypes);
db.Review = require("./review")(sequelize, DataTypes);

// Associations
db.Platform.hasMany(db.Game, { foreignKey: "platformId" });
db.Game.belongsTo(db.Platform, { foreignKey: "platformId" });

db.Genre.hasMany(db.Game, { foreignKey: "genreId" });
db.Game.belongsTo(db.Genre, { foreignKey: "genreId" });

db.Game.hasMany(db.Review, { foreignKey: "gameId" });
db.Review.belongsTo(db.Game, { foreignKey: "gameId" });

module.exports = db;