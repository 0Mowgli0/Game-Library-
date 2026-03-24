const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

const gamesRoute = require("./routes/gamesRoute");
const platformsRoute = require("./routes/platformsRoute");
const genresRoute = require("./routes/genresRoute");
const reviewsRoute = require("./routes/reviewsRoute");
const usersRoute = require("./routes/usersRoute");
const ratingsRoute = require("./routes/ratingsRoute");
const cartRoute = require("./routes/cartRoute");
const discountsRoute = require("./routes/discountsRoute");
const storeReviewsRoute = require("./routes/storeReviewsRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/games", gamesRoute);
app.use("/api/platforms", platformsRoute);
app.use("/api/genres", genresRoute);
app.use("/api/reviews", reviewsRoute);
app.use("/api/users", usersRoute);
app.use("/api/ratings", ratingsRoute);
app.use("/api/cart", cartRoute);
app.use("/api/discounts", discountsRoute);
app.use("/api/store-reviews", storeReviewsRoute);

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = 5000;

app.listen(PORT, async () => {
  await sequelize.sync({ alter: true });
  console.log(`Server running on http://localhost:${PORT}`);
});