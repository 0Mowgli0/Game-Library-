// Games.jsx
import { useEffect, useState } from "react";
import { Typography, Box, MenuItem, TextField } from "@mui/material";
import { useLocation } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import GameList from "../components/games/GameList";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";
import gameService from "../services/gameService";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Games() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sort, setSort] = useState("");
  const query = useQuery();

  useEffect(() => {
    const sortParam = query.get("sort");
    if (sortParam) setSort(sortParam);
  }, []);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await gameService.getAllGames();
        setGames(response.data);
      } catch (err) {
        setError("Kunde inte hämta spel.");
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const sortedGames = [...games].sort((a, b) => {
    if (sort === "price") return (a.price || 0) - (b.price || 0);
    if (sort === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  return (
    <PageContainer>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Butik
        </Typography>
        <TextField
          select
          size="small"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          sx={{
            minWidth: 180,
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#1f2f3d",
              color: "#c7d5e0",
              borderRadius: "10px",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255,255,255,0.1)",
            },
            "& .MuiSvgIcon-root": {
              color: "#c7d5e0",
            },
          }}
        >
          <MenuItem value="">Sortera — Standard</MenuItem>
          <MenuItem value="price">Lägsta pris</MenuItem>
          <MenuItem value="rating">Högst betyg</MenuItem>
        </TextField>
      </Box>

      <Typography variant="body1" sx={{ mb: 4, color: "#8fa7ba" }}>
        Bläddra bland våra spel och lägg till i varukorgen
      </Typography>

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && sortedGames.length === 0 && (
        <EmptyState message="Inga spel hittades." />
      )}
      {!loading && !error && sortedGames.length > 0 && <GameList games={sortedGames} />}
    </PageContainer>
  );
}

export default Games;