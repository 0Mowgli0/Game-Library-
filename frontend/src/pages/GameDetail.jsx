import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box, Button, Chip, Stack, Typography, Rating,
  TextField, Divider, Paper,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PageContainer from "../components/layout/PageContainer";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import gameService from "../services/gameService";

const USER_ID = 1;

function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ title: "", body: "", rating: 0 });
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [newRating, setNewRating] = useState(0);

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
    try {
      await gameService.addToCart(USER_ID, game.id, 1);
      alert("Spelet lades till i varukorgen!");
    } catch (err) {
      console.error("Kunde inte lägga till i varukorg", err);
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
    } catch (err) {
      console.error("Kunde inte sätta betyg", err);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await gameService.createReview({ ...reviewForm, gameId: id });
      setReviews((prev) => [...prev, res.data]);
      setReviewForm({ title: "", body: "", rating: 0 });
    } catch (err) {
      console.error("Kunde inte skapa recension", err);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await gameService.deleteReview(reviewId);
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    } catch (err) {
      console.error("Kunde inte radera recension", err);
    }
  };

  if (loading) return <PageContainer><Loading /></PageContainer>;
  if (error) return <PageContainer><ErrorMessage message={error} /></PageContainer>;
  if (!game) return <PageContainer><ErrorMessage message="Spelet hittades inte." /></PageContainer>;

  const imageSrc = game.image || "https://placehold.co/1000x500?text=Game";

  const textFieldStyles = {
    mb: 2,
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#f5f7fa",
      color: "#111",
      borderRadius: "10px",
    },
    "& .MuiInputLabel-root": { color: "#c7d5e0" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#66c0f4" },
  };

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
          onError={(e) => { e.target.src = "https://placehold.co/1000x500?text=Game"; }}
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
            label={game.Genre?.name || game.genre || "Okänd genre"}
            sx={{ backgroundColor: "#66c0f4", color: "#0b1a24", fontWeight: 700 }}
          />
          <Chip
            label={game.Platform?.name || game.platform || "Okänd plattform"}
            sx={{ backgroundColor: "#2a475e", color: "#c7d5e0" }}
          />
          <Chip
            label={game.status || "Okänd status"}
            sx={{ backgroundColor: "#2a475e", color: "#c7d5e0" }}
          />
        </Stack>

        {game.price && (
          <Typography variant="h5" sx={{ color: "#66c0f4", fontWeight: 800, mb: 3 }}>
            {game.price} kr
          </Typography>
        )}

        {/* Snittbetyg */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ color: "#8fa7ba", mb: 0.5 }}>
            Snittbetyg ({ratings.length} {ratings.length === 1 ? "betyg" : "betyg"})
          </Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box sx={{
              display: "inline-block",
              backgroundColor: "rgba(255,255,255,0.08)",
              borderRadius: "8px",
              px: 1.5,
              py: 0.5,
            }}>
              <Rating
                value={averageRating}
                precision={0.1}
                readOnly
                sx={{ color: "#66c0f4" }}
              />
            </Box>
            <Typography sx={{ color: "#ffffff", fontWeight: 700 }}>
              {averageRating > 0 ? `${averageRating} / 5` : "Inga betyg ännu"}
            </Typography>
          </Stack>
        </Box>

        {/* Sätt betyg */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ color: "#8fa7ba", mb: 0.5 }}>Sätt ditt betyg</Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box sx={{
              display: "inline-block",
              backgroundColor: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.25)",
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

        <Typography variant="body1" sx={{ color: "#c7d5e0", lineHeight: 1.8, mb: 3 }}>
          {game.description || "Ingen beskrivning tillagd."}
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 5 }}>
          <Button
            variant="contained"
            startIcon={<ShoppingCartIcon />}
            onClick={handleAddToCart}
            sx={{
              backgroundColor: "#57cc99",
              color: "#0b1a24",
              fontWeight: 700,
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
              color: "#c7d5e0",
              borderColor: "rgba(255,255,255,0.2)",
              "&:hover": { borderColor: "#66c0f4", color: "#66c0f4" },
            }}
          >
            Tillbaka
          </Button>
        </Stack>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mb: 4 }} />

        {/* Recensioner */}
        <Typography variant="h5" sx={{ fontWeight: 800, color: "#ffffff", mb: 3 }}>
          Recensioner
        </Typography>

        {reviews.length === 0 ? (
          <Typography sx={{ color: "#8fa7ba", mb: 3 }}>
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
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Typography sx={{ fontWeight: 700, color: "#ffffff" }}>
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
              <Typography variant="body2" sx={{ color: "#c7d5e0" }}>
                {review.body}
              </Typography>
            </Paper>
          ))
        )}

        {/* Lägg till recension */}
        <Typography variant="h6" sx={{ fontWeight: 800, color: "#ffffff", mt: 4, mb: 2 }}>
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
            <Typography sx={{ color: "#c7d5e0", mb: 1 }}>Betyg</Typography>
            <Box sx={{
              display: "inline-block",
              backgroundColor: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.25)",
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