import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import PageContainer from "../components/layout/PageContainer";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import gameService from "../services/gameService";

function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await gameService.getGameById(id);
        console.log("Game från backend:", response.data);
        setGame(response.data);
      } catch (err) {
        console.error("Fel vid hämtning av spel:", err);
        setError("Kunde inte hämta spelet.");
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  if (loading) {
    return (
      <PageContainer>
        <Loading />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <ErrorMessage message={error} />
      </PageContainer>
    );
  }

  if (!game) {
    return (
      <PageContainer>
        <ErrorMessage message="Spelet hittades inte." />
      </PageContainer>
    );
  }

  const imageSrc =
    game.image ||
    "https://placehold.co/1000x500?text=Game";

  return (
    <PageContainer>
      <Box
        sx={{
          p: 4,
          borderRadius: "18px",
          background: "linear-gradient(180deg, #1f2f3d 0%, #16202d 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 12px 28px rgba(0,0,0,0.25)",
        }}
      >
        <Box
          component="img"
          src={imageSrc}
          alt={game.title}
          onError={(e) => {
            console.log("Bild kunde inte laddas:", imageSrc);
            e.target.src = "https://placehold.co/1000x500?text=Game";
          }}
          sx={{
            width: "100%",
            maxHeight: 420,
            objectFit: "cover",
            borderRadius: "14px",
            mb: 3,
            backgroundColor: "#2a475e",
          }}
        />

        <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, color: "#ffffff" }}>
          {game.title}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: "wrap" }}>
          <Chip
            label={game.genre || "Okänd genre"}
            sx={{
              backgroundColor: "#66c0f4",
              color: "#0b1a24",
              fontWeight: 700,
            }}
          />
          <Chip
            label={game.platform || "Okänd plattform"}
            sx={{
              backgroundColor: "#2a475e",
              color: "#c7d5e0",
            }}
          />
          <Chip
            label={game.status || "Okänd status"}
            sx={{
              backgroundColor: "#2a475e",
              color: "#c7d5e0",
            }}
          />
        </Stack>

        <Typography
          variant="body1"
          sx={{ color: "#c7d5e0", lineHeight: 1.8, mb: 3 }}
        >
          {game.description || "Ingen beskrivning tillagd."}
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            component={Link}
            to={`/games/edit/${game.id}`}
            variant="contained"
            sx={{
              backgroundColor: "#66c0f4",
              color: "#0b1a24",
              fontWeight: 700,
              "&:hover": { backgroundColor: "#8fd7ff" },
            }}
          >
            Redigera
          </Button>

          <Button
            component={Link}
            to="/games"
            variant="outlined"
            sx={{
              color: "#c7d5e0",
              borderColor: "rgba(255,255,255,0.2)",
              "&:hover": {
                borderColor: "#66c0f4",
                color: "#66c0f4",
              },
            }}
          >
            Tillbaka
          </Button>
        </Stack>
      </Box>
    </PageContainer>
  );
}

export default GameDetail;