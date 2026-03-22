import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Stack,
  Chip,
  Box,
  Rating,
} from "@mui/material";
import { Link } from "react-router-dom";

function GameCard({ game }) {
  return (
    <Card
      sx={{
        height: "100%",
        background: "linear-gradient(180deg, #1f2f3d 0%, #16202d 100%)",
        color: "#e6edf3",
        borderRadius: "14px",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        transition: "all 0.25s ease",
        boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 14px 28px rgba(0,0,0,0.35)",
          borderColor: "rgba(102,192,244,0.5)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={game.image || "https://placehold.co/600x400?text=Game"}
        alt={game.title}
      />

      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
          {game.title}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap" }}>
          <Chip
            label={game.genre || "Okänd genre"}
            size="small"
            sx={{ backgroundColor: "#66c0f4", color: "#0b1a24", fontWeight: 700 }}
          />
          <Chip
            label={game.platform || "Okänd plattform"}
            size="small"
            sx={{ backgroundColor: "#2a475e", color: "#c7d5e0" }}
          />
        </Stack>

        {game.status === "Klar" && game.rating && (
          <Box sx={{
            display: "inline-block",
            backgroundColor: "rgba(255,255,255,0.08)",
            borderRadius: "8px",
            px: 1.5,
            py: 0.5,
            mb: 1,
          }}>
            <Rating
              value={game.rating}
              readOnly
              size="small"
              sx={{ color: "#66c0f4" }}
            />
          </Box>
        )}

        <Box sx={{ minHeight: 48 }}>
          <Typography variant="body2" sx={{ color: "#c7d5e0" }}>
            {game.description
              ? game.description.slice(0, 90) + (game.description.length > 90 ? "..." : "")
              : "Ingen beskrivning tillagd."}
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Button
            component={Link}
            to={`/games/${game.id}`}
            variant="contained"
            sx={{
              backgroundColor: "#66c0f4",
              color: "#0b1a24",
              fontWeight: 700,
              "&:hover": { backgroundColor: "#8fd7ff" },
            }}
          >
            Läs mer
          </Button>

          <Button
            component={Link}
            to={`/games/edit/${game.id}`}
            variant="outlined"
            sx={{
              color: "#c7d5e0",
              borderColor: "rgba(255,255,255,0.2)",
              "&:hover": { borderColor: "#66c0f4", color: "#66c0f4" },
            }}
          >
            Redigera
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default GameCard;