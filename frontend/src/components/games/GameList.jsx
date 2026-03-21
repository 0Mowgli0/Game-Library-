import { Grid } from "@mui/material";
import GameCard from "./GameCard";

function GameList({ games }) {
  return (
    <Grid container spacing={3}>
      {games.map((game) => (
        <Grid item xs={12} sm={6} md={4} key={game.id}>
          <GameCard game={game} />
        </Grid>
      ))}
    </Grid>
  );
}

export default GameList;