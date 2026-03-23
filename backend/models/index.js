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
db.User = require("./user")(sequelize, DataTypes);
db.Cart = require("./cart")(sequelize, DataTypes);
db.CartRow = require("./cartRow")(sequelize, DataTypes);
db.Rating = require("./rating")(sequelize, DataTypes);

// Game associations
db.Platform.hasMany(db.Game, { foreignKey: "platformId" });
db.Game.belongsTo(db.Platform, { foreignKey: "platformId" });

db.Genre.hasMany(db.Game, { foreignKey: "genreId" });
db.Game.belongsTo(db.Genre, { foreignKey: "genreId" });

db.Game.hasMany(db.Review, { foreignKey: "gameId" });
db.Review.belongsTo(db.Game, { foreignKey: "gameId" });

db.Game.hasMany(db.Rating, { foreignKey: "gameId" });
db.Rating.belongsTo(db.Game, { foreignKey: "gameId" });

// Cart associations
db.User.hasMany(db.Cart, { foreignKey: "userId" });
db.Cart.belongsTo(db.User, { foreignKey: "userId" });

db.Cart.belongsToMany(db.Game, { through: db.CartRow, foreignKey: "cartId" });
db.Game.belongsToMany(db.Cart, { through: db.CartRow, foreignKey: "gameId" });

module.exports = db;