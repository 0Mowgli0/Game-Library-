const express = require("express");
const cors = require("cors");

const gamesRoute = require("./routes/gamesRoute");
const postsRoute = require("./routes/postsRoute");
const tagsRoute = require("./routes/tagsRoute");
const usersRoute = require("./routes/usersRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/games", gamesRoute);
app.use("/api/posts", postsRoute);
app.use("/api/tags", tagsRoute);
app.use("/api/users", usersRoute);

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = 5000;

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
});