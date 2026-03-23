import { Grid } from "@mui/material";
import { motion } from "framer-motion";
import GameCard from "./GameCard";

function GameList({ games }) {
  return (
    <Grid container spacing={3}>
      {games.map((game, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={game.id}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            style={{ height: "100%" }}
          >
            <GameCard game={game} />
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
}

export default GameList;