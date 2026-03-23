import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Stack,
  Chip,
  Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import gameService from "../../services/gameService";

const USER_ID = 1;

function GameCard({ game }) {
  const handleAddToCart = async () => {
    try {
      await gameService.addToCart(USER_ID, game.id, 1);
      alert("Spelet lades till i varukorgen!");
    } catch (err) {
      console.error("Kunde inte lägga till i varukorg", err);
    }
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
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

      <CardContent sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
          {game.title}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap" }}>
          <Chip
            label={game.Genre?.name || "Okänd genre"}
            size="small"
            sx={{ backgroundColor: "#66c0f4", color: "#0b1a24", fontWeight: 700 }}
          />
          <Chip
            label={game.Platform?.name || "Okänd plattform"}
            size="small"
            sx={{ backgroundColor: "#2a475e", color: "#c7d5e0" }}
          />
        </Stack>

        <Box sx={{ minHeight: 48, mb: 2 }}>
          <Typography variant="body2" sx={{ color: "#c7d5e0" }}>
            {game.description
              ? game.description.slice(0, 90) + (game.description.length > 90 ? "..." : "")
              : "Ingen beskrivning tillagd."}
          </Typography>
        </Box>

        <Box sx={{ mt: "auto" }}>
          {game.price ? (
            <Typography variant="h5" sx={{ color: "#57cc99", fontWeight: 900, mb: 2 }}>
              {game.price} kr
            </Typography>
          ) : (
            <Typography variant="h5" sx={{ color: "#8fa7ba", fontWeight: 900, mb: 2 }}>
              Inget pris
            </Typography>
          )}

          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddToCart}
              sx={{
                backgroundColor: "#57cc99",
                color: "#0b1a24",
                fontWeight: 700,
                flex: 1,
                "&:hover": { backgroundColor: "#3dba83" },
              }}
            >
              Köp nu
            </Button>
            <Button
              component={Link}
              to={`/games/${game.id}`}
              variant="outlined"
              sx={{
                color: "#c7d5e0",
                borderColor: "rgba(255,255,255,0.2)",
                "&:hover": { borderColor: "#66c0f4", color: "#66c0f4" },
              }}
            >
              Info
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

export default GameCard;