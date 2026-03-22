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

db.User = require("./user")(sequelize, DataTypes);
db.Post = require("./post")(sequelize, DataTypes);
db.Tag = require("./tag")(sequelize, DataTypes);
db.Comment = require("./comment")(sequelize, DataTypes);
db.PostTag = require("./postTag")(sequelize, DataTypes);
db.Game = require("./game")(sequelize, DataTypes);

// Associations

db.User.hasMany(db.Post, { foreignKey: "userId" });
db.Post.belongsTo(db.User, { foreignKey: "userId" });

db.Post.hasMany(db.Comment, { foreignKey: "postId" });
db.Comment.belongsTo(db.Post, { foreignKey: "postId" });

db.User.hasMany(db.Comment, { foreignKey: "userId" });
db.Comment.belongsTo(db.User, { foreignKey: "userId" });

db.Post.belongsToMany(db.Tag, {
  through: db.PostTag,
  foreignKey: "postId",
});
db.Tag.belongsToMany(db.Post, {
  through: db.PostTag,
  foreignKey: "tagId",
});

module.exports = db;