import { Grid } from "@mui/material";
import GameCardSkeleton from "./GameCardSkeleton";

function GameListSkeleton() {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: 8 }).map((_, i) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
          <GameCardSkeleton />
        </Grid>
      ))}
    </Grid>
  );
}

export default GameListSkeleton;