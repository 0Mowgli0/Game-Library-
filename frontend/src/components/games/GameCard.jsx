// GameCard.jsx
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Stack,
  Chip,
  Box,
  useTheme,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import gameService from "../../services/gameService";
import { useSnackbar } from "../../context/SnackbarContext";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";

function GameCard({ game }) {
  const { showSnackbar } = useSnackbar();
  const { fetchCartCount } = useCart();
  const { currentUser } = useUser();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const salePrice = game.onSale && game.price && game.salePercentage
    ? Math.round(game.price * (1 - game.salePercentage / 100))
    : null;

  const handleAddToCart = async () => {
    if (!currentUser) {
      showSnackbar("Välj en användare först!", "warning");
      return;
    }
    try {
      await gameService.addToCart(currentUser.id, game.id, 1);
      showSnackbar(`${game.title} lades till i varukorgen!`);
      fetchCartCount();
    } catch (err) {
      showSnackbar("Kunde inte lägga till i varukorgen", "error");
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ height: "100%" }}
    >
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: isDark
            ? "linear-gradient(180deg, #1f2f3d 0%, #16202d 100%)"
            : "linear-gradient(180deg, #ffffff 0%, #f0f4f8 100%)",
          color: theme.palette.text.primary,
          borderRadius: "14px",
          overflow: "hidden",
          border: isDark
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(0,0,0,0.08)",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          boxShadow: isDark
            ? "0 8px 20px rgba(0,0,0,0.25)"
            : "0 8px 20px rgba(0,0,0,0.08)",
          "&:hover": {
            boxShadow: isDark
              ? "0 20px 40px rgba(0,0,0,0.4)"
              : "0 20px 40px rgba(0,0,0,0.15)",
            borderColor: "rgba(102,192,244,0.6)",
          },
        }}
      >
        {/* Bild med REA-badge */}
        <Box sx={{ overflow: "hidden", position: "relative" }}>
          <CardMedia
            component="img"
            height="200"
            image={game.image || "https://placehold.co/600x400?text=Game"}
            alt={game.title}
            sx={{
              transition: "transform 0.4s ease",
              "&:hover": { transform: "scale(1.08)" },
            }}
          />
          {game.onSale && salePrice && (
            <Box
              sx={{
                position: "absolute",
                top: 12,
                left: 12,
                backgroundColor: "#57cc99",
                color: "#0b1a24",
                fontWeight: 900,
                fontSize: "0.8rem",
                px: 1.5,
                py: 0.5,
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <LocalOfferIcon sx={{ fontSize: 14 }} />
              -{game.salePercentage}%
            </Box>
          )}
        </Box>

        <CardContent sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: theme.palette.text.primary }}>
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
              sx={{
                backgroundColor: isDark ? "#2a475e" : "#e0eaf5",
                color: isDark ? "#c7d5e0" : "#4a6080",
              }}
            />
          </Stack>

          <Box sx={{ minHeight: 48, mb: 2 }}>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              {game.description
                ? game.description.slice(0, 90) + (game.description.length > 90 ? "..." : "")
                : "Ingen beskrivning tillagd."}
            </Typography>
          </Box>

          <Box sx={{ mt: "auto" }}>
            {game.price ? (
              <Box sx={{ mb: 2 }}>
                {game.onSale && salePrice ? (
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.text.secondary,
                        textDecoration: "line-through",
                      }}
                    >
                      {game.price} kr
                    </Typography>
                    <Typography variant="h5" sx={{ color: "#57cc99", fontWeight: 900 }}>
                      {salePrice} kr
                    </Typography>
                  </Stack>
                ) : (
                  <Typography variant="h5" sx={{ color: "#57cc99", fontWeight: 900 }}>
                    {game.price} kr
                  </Typography>
                )}
              </Box>
            ) : (
              <Typography variant="h5" sx={{ color: theme.palette.text.secondary, fontWeight: 900, mb: 2 }}>
                Inget pris
              </Typography>
            )}

            <Stack direction="row" spacing={1}>
              <motion.div whileTap={{ scale: 0.95 }} style={{ flex: 1 }}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  onClick={handleAddToCart}
                  sx={{
                    backgroundColor: "#57cc99",
                    color: "#0b1a24",
                    fontWeight: 700,
                    "&:hover": {
                      backgroundColor: "#3dba83",
                      boxShadow: "0 4px 12px rgba(87,204,153,0.4)",
                    },
                  }}
                >
                  Köp nu
                </Button>
              </motion.div>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  component={Link}
                  to={`/games/${game.id}`}
                  variant="outlined"
                  sx={{
                    color: isDark ? "#c7d5e0" : "#4a6080",
                    borderColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
                    "&:hover": { borderColor: "#66c0f4", color: "#66c0f4" },
                  }}
                >
                  Info
                </Button>
              </motion.div>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default GameCard;