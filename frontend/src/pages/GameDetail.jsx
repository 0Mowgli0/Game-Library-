// GameDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box, Button, Chip, Stack, Typography, Rating,
  TextField, Divider, Paper, useTheme,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PageContainer from "../components/layout/PageContainer";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import Breadcrumbs from "../components/common/Breadcrumbs";
import gameService from "../services/gameService";
import { useSnackbar } from "../context/SnackbarContext";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

function GameDetail() {
  const { id } = useParams();
  const { showSnackbar } = useSnackbar();
  const { fetchCartCount } = useCart();
  const { currentUser } = useUser();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ title: "", body: "", rating: 0 });
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [newRating, setNewRating] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await gameService.getGameById(id);
        setGame(response.data);
        const reviewRes = await gameService.getReviewsByGameId(id);
        setReviews(reviewRes.data);
        const ratingRes = await gameService.getRatingsByGameId(id);
        setRatings(ratingRes.data.ratings);
        setAverageRating(ratingRes.data.average);
      } catch (err) {
        setError("Kunde inte hämta spelet.");
      } finally {
        setLoading(false);
      }
    };
    fetchGame();
  }, [id]);

  const handleAddToCart = async () => {
    if (!currentUser) {
      showSnackbar("Välj en användare först!", "warning");
      return;
    }
    try {
      await gameService.addToCart(currentUser.id, game.id, quantity);
      showSnackbar(`${quantity} st ${game.title} lades till i varukorgen!`);
      fetchCartCount();
    } catch (err) {
      showSnackbar("Kunde inte lägga till i varukorgen", "error");
    }
  };

  const handleRatingSubmit = async () => {
    if (!newRating) return;
    try {
      await gameService.createRating({ gameId: id, rating: newRating });
      const ratingRes = await gameService.getRatingsByGameId(id);
      setRatings(ratingRes.data.ratings);
      setAverageRating(ratingRes.data.average);
      setNewRating(0);
      showSnackbar("Betyg skickat!");
    } catch (err) {
      showSnackbar("Kunde inte sätta betyg", "error");
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await gameService.createReview({ ...reviewForm, gameId: id });
      setReviews((prev) => [...prev, res.data]);
      setReviewForm({ title: "", body: "", rating: 0 });
      showSnackbar("Recension publicerad!");
    } catch (err) {
      showSnackbar("Kunde inte skapa recension", "error");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await gameService.deleteReview(reviewId);
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      showSnackbar("Recension borttagen", "info");
    } catch (err) {
      showSnackbar("Kunde inte radera recension", "error");
    }
  };

  if (loading) return <PageContainer><Loading /></PageContainer>;
  if (error) return <PageContainer><ErrorMessage message={error} /></PageContainer>;
  if (!game) return <PageContainer><ErrorMessage message="Spelet hittades inte." /></PageContainer>;

  const imageSrc = game.image || "https://placehold.co/1000x500?text=Game";
  const salePrice = game.onSale && game.price && game.salePercentage
    ? Math.round(game.price * (1 - game.salePercentage / 100))
    : null;

  const textFieldStyles = {
    mb: 2,
    "& .MuiOutlinedInput-root": {
      backgroundColor: isDark ? "#2a475e" : "#ffffff",
      color: theme.palette.text.primary,
      borderRadius: "10px",
    },
    "& .MuiInputLabel-root": { color: theme.palette.text.secondary },
    "& .MuiInputLabel-root.Mui-focused": { color: "#66c0f4" },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
    },
  };

  return (
    <PageContainer>
      <Breadcrumbs
        crumbs={[
          { label: "Hem", to: "/" },
          { label: "Butik", to: "/games" },
          { label: game.title },
        ]}
      />

      <Box
        sx={{
          p: 4,
          borderRadius: "18px",
          background: isDark
            ? "linear-gradient(180deg, #1f2f3d 0%, #16202d 100%)"
            : "linear-gradient(180deg, #ffffff 0%, #f0f4f8 100%)",
          border: isDark
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(0,0,0,0.08)",
          boxShadow: isDark
            ? "0 12px 28px rgba(0,0,0,0.25)"
            : "0 12px 28px rgba(0,0,0,0.08)",
        }}
      >
        {/* Bild med REA-badge */}
        <Box sx={{ position: "relative", mb: 3 }}>
          <Box
            component="img"
            src={imageSrc}
            alt={game.title}
            onError={(e) => { e.target.src = "https://placehold.co/1000x500?text=Game"; }}
            sx={{
              width: "100%",
              maxHeight: 420,
              objectFit: "cover",
              borderRadius: "14px",
              backgroundColor: isDark ? "#2a475e" : "#e0eaf5",
            }}
          />
          {game.onSale && salePrice && (
            <Box
              sx={{
                position: "absolute",
                top: 16,
                left: 16,
                backgroundColor: "#57cc99",
                color: "#0b1a24",
                fontWeight: 900,
                fontSize: "1rem",
                px: 2,
                py: 0.8,
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <LocalOfferIcon sx={{ fontSize: 18 }} />
              REA -{game.salePercentage}%
            </Box>
          )}
        </Box>

        <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, color: theme.palette.text.primary }}>
          {game.title}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: "wrap" }}>
          <Chip
            label={game.Genre?.name || game.genre || "Okänd genre"}
            sx={{ backgroundColor: "#66c0f4", color: "#0b1a24", fontWeight: 700 }}
          />
          <Chip
            label={game.Platform?.name || game.platform || "Okänd plattform"}
            sx={{
              backgroundColor: isDark ? "#2a475e" : "#e0eaf5",
              color: theme.palette.text.secondary,
            }}
          />
          {game.onSale && (
            <Chip
              label="REA"
              icon={<LocalOfferIcon sx={{ fontSize: "16px !important", color: "#0b1a24 !important" }} />}
              sx={{ backgroundColor: "#57cc99", color: "#0b1a24", fontWeight: 700 }}
            />
          )}
        </Stack>

        {/* Pris */}
        {game.price && (
          <Box sx={{ mb: 3 }}>
            {game.onSale && salePrice ? (
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.text.secondary, textDecoration: "line-through" }}
                >
                  {game.price} kr
                </Typography>
                <Chip
                  label={`-${game.salePercentage}%`}
                  sx={{ backgroundColor: "#57cc99", color: "#0b1a24", fontWeight: 800 }}
                />
                <Typography variant="h4" sx={{ color: "#57cc99", fontWeight: 900 }}>
                  {salePrice} kr
                </Typography>
              </Stack>
            ) : (
              <Typography variant="h5" sx={{ color: "#57cc99", fontWeight: 800 }}>
                {game.price} kr
              </Typography>
            )}
          </Box>
        )}

        {/* Snittbetyg */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ color: theme.palette.text.secondary, mb: 0.5 }}>
            Snittbetyg ({ratings.length} betyg)
          </Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box sx={{
              display: "inline-block",
              backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
              borderRadius: "8px",
              px: 1.5,
              py: 0.5,
            }}>
              <Rating value={averageRating} precision={0.1} readOnly sx={{ color: "#66c0f4" }} />
            </Box>
            <Typography sx={{ color: theme.palette.text.primary, fontWeight: 700 }}>
              {averageRating > 0 ? `${averageRating} / 5` : "Inga betyg ännu"}
            </Typography>
          </Stack>
        </Box>

        {/* Sätt betyg */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ color: theme.palette.text.secondary, mb: 0.5 }}>Sätt ditt betyg</Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box sx={{
              display: "inline-block",
              backgroundColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.05)",
              border: isDark ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(0,0,0,0.1)",
              borderRadius: "8px",
              px: 1.5,
              py: 0.5,
            }}>
              <Rating
                value={newRating}
                onChange={(_, val) => setNewRating(val)}
                sx={{ color: "#66c0f4" }}
              />
            </Box>
            <Button
              variant="contained"
              onClick={handleRatingSubmit}
              disabled={!newRating}
              sx={{
                backgroundColor: "#66c0f4",
                color: "#0b1a24",
                fontWeight: 700,
                "&:hover": { backgroundColor: "#8fd7ff" },
              }}
            >
              Skicka betyg
            </Button>
          </Stack>
        </Box>

        <Typography variant="body1" sx={{ color: theme.palette.text.secondary, lineHeight: 1.8, mb: 3 }}>
          {game.description || "Ingen beskrivning tillagd."}
        </Typography>

        {/* Antal + Lägg i varukorg */}
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 5 }}>
          <TextField
            type="number"
            label="Antal"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            inputProps={{ min: 1 }}
            sx={{ width: 100, ...textFieldStyles }}
          />
          <Button
            variant="contained"
            startIcon={<ShoppingCartIcon />}
            onClick={handleAddToCart}
            sx={{
              backgroundColor: "#57cc99",
              color: "#0b1a24",
              fontWeight: 700,
              py: 1.5,
              px: 3,
              "&:hover": { backgroundColor: "#3dba83" },
            }}
          >
            Lägg i varukorg
          </Button>
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
              color: theme.palette.text.secondary,
              borderColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
              "&:hover": { borderColor: "#66c0f4", color: "#66c0f4" },
            }}
          >
            Tillbaka
          </Button>
        </Stack>

        <Divider sx={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)", mb: 4 }} />

        {/* Recensioner */}
        <Typography variant="h5" sx={{ fontWeight: 800, color: theme.palette.text.primary, mb: 3 }}>
          Recensioner
        </Typography>

        {reviews.length === 0 ? (
          <Typography sx={{ color: theme.palette.text.secondary, mb: 3 }}>
            Inga recensioner ännu.
          </Typography>
        ) : (
          reviews.map((review) => (
            <Paper
              key={review.id}
              elevation={0}
              sx={{
                p: 3,
                mb: 2,
                borderRadius: "12px",
                background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)",
                border: isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)",
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Typography sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                  {review.title}
                </Typography>
                <Button
                  size="small"
                  onClick={() => handleDeleteReview(review.id)}
                  sx={{ color: "#ff6b6b", minWidth: "auto" }}
                >
                  Ta bort
                </Button>
              </Stack>
              {review.rating > 0 && (
                <Rating value={review.rating} readOnly size="small" sx={{ color: "#66c0f4", mb: 1 }} />
              )}
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                {review.body}
              </Typography>
            </Paper>
          ))
        )}

        {/* Lägg till recension */}
        <Typography variant="h6" sx={{ fontWeight: 800, color: theme.palette.text.primary, mt: 4, mb: 2 }}>
          Lägg till recension
        </Typography>

        <Box component="form" onSubmit={handleReviewSubmit}>
          <TextField
            fullWidth
            label="Titel"
            value={reviewForm.title}
            onChange={(e) => setReviewForm((prev) => ({ ...prev, title: e.target.value }))}
            sx={textFieldStyles}
          />
          <TextField
            fullWidth
            label="Recension"
            value={reviewForm.body}
            onChange={(e) => setReviewForm((prev) => ({ ...prev, body: e.target.value }))}
            multiline
            rows={4}
            sx={textFieldStyles}
          />
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ color: theme.palette.text.secondary, mb: 1 }}>Betyg</Typography>
            <Box sx={{
              display: "inline-block",
              backgroundColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.05)",
              border: isDark ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(0,0,0,0.1)",
              borderRadius: "8px",
              px: 1.5,
              py: 0.5,
            }}>
              <Rating
                value={reviewForm.rating}
                onChange={(_, newValue) => setReviewForm((prev) => ({ ...prev, rating: newValue }))}
                sx={{ color: "#66c0f4" }}
              />
            </Box>
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#66c0f4",
              color: "#0b1a24",
              fontWeight: 800,
              borderRadius: "10px",
              "&:hover": { backgroundColor: "#8fd7ff" },
            }}
          >
            Skicka recension
          </Button>
        </Box>
      </Box>
    </PageContainer>
  );
}

export default GameDetail;