import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import PageContainer from "../components/layout/PageContainer";
import GameList from "../components/games/GameList";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";
import gameService from "../services/gameService";

function Games() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <PageContainer>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 800 }}>
        Spelbibliotek
      </Typography>

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && games.length === 0 && (
        <EmptyState message="Inga spel hittades." />
      )}
      {!loading && !error && games.length > 0 && <GameList games={games} />}
    </PageContainer>
  );
}

export default Games;