import { useEffect, useState } from "react";
import {
  Box, Typography, Paper, Stack, Rating, TextField,
  Button, Divider, Avatar, useTheme,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import PageContainer from "../components/layout/PageContainer";
import Breadcrumbs from "../components/common/Breadcrumbs";
import Loading from "../components/common/Loading";
import StarIcon from "@mui/icons-material/Star";
import gameService from "../services/gameService";
import { useSnackbar } from "../context/SnackbarContext";

function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", rating: 0, text: "" });
  const [submitting, setSubmitting] = useState(false);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { showSnackbar } = useSnackbar();

  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 0;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await gameService.getAllStoreReviews();
        setReviews(res.data);
      } catch (err) {
        console.error("Kunde inte hämta recensioner", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.rating || !form.text) return;
    setSubmitting(true);
    try {
      const res = await gameService.createStoreReview(form);
      setReviews((prev) => [res.data, ...prev]);
      setForm({ name: "", rating: 0, text: "" });
      showSnackbar("Recension publicerad!", "success");
    } catch (err) {
      showSnackbar("Kunde inte skicka recension", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await gameService.deleteStoreReview(id);
      setReviews((prev) => prev.filter((r) => r.id !== id));
      showSnackbar("Recension borttagen", "info");
    } catch (err) {
      showSnackbar("Kunde inte radera recension", "error");
    }
  };

  const textFieldStyles = {
    mb: 2,
    "& .MuiOutlinedInput-root": {
      backgroundColor: isDark ? "#2a475e" : "#ffffff",
      color: theme.palette.text.primary,
      borderRadius: "10px",
    },
    "& .MuiInputLabel-root": { color: theme.palette.text.secondary },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
    },
  };

  if (loading) return <PageContainer><Loading /></PageContainer>;

  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          background: isDark
            ? "linear-gradient(135deg, #1a1a2e 0%, #2a2a4e 50%, #1f2f4d 100%)"
            : "linear-gradient(135deg, #e8eaf6 0%, #c5cae9 50%, #9fa8da 100%)",
          borderBottom: isDark
            ? "1px solid rgba(102,192,244,0.15)"
            : "1px solid rgba(102,192,244,0.3)",
          py: 6,
          px: { xs: 3, md: 8 },
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <StarIcon sx={{ fontSize: 40, color: "#66c0f4" }} />
            <Typography variant="h3" sx={{ fontWeight: 900, color: isDark ? "#ffffff" : "#1a1a3e" }}>
              Kundrecensioner
            </Typography>
          </Box>
          {reviews.length > 0 && (
            <Stack direction="row" alignItems="center" spacing={2}>
              <Rating value={averageRating} precision={0.1} readOnly sx={{ color: "#66c0f4" }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: isDark ? "#c7d5e0" : "#3a3a6e" }}>
                {averageRating.toFixed(1)} / 5 — {reviews.length} recensioner
              </Typography>
            </Stack>
          )}
        </motion.div>
      </Box>

      <PageContainer>
        <Breadcrumbs
          crumbs={[
            { label: "Hem", to: "/" },
            { label: "Kundrecensioner" },
          ]}
        />

        {/* Statistik */}
        {reviews.length > 0 && (
          <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ mb: 5 }}>
            {[5, 4, 3, 2, 1].map((star) => {
              const count = reviews.filter((r) => r.rating === star).length;
              const percent = Math.round((count / reviews.length) * 100);
              return (
                <Paper
                  key={star}
                  elevation={0}
                  sx={{
                    p: 2,
                    flex: 1,
                    borderRadius: "12px",
                    textAlign: "center",
                    background: isDark
                      ? "linear-gradient(180deg, #1f2f3d 0%, #16202d 100%)"
                      : "linear-gradient(180deg, #ffffff 0%, #f0f4f8 100%)",
                    border: isDark
                      ? "1px solid rgba(255,255,255,0.07)"
                      : "1px solid rgba(0,0,0,0.07)",
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: 900, color: "#66c0f4" }}>{count}</Typography>
                  <Rating value={star} readOnly size="small" sx={{ color: "#66c0f4" }} />
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    {percent}%
                  </Typography>
                </Paper>
              );
            })}
          </Stack>
        )}

        {/* Recensioner */}
        <Typography variant="h5" sx={{ fontWeight: 800, color: theme.palette.text.primary, mb: 3 }}>
          Vad våra kunder säger
        </Typography>

        {reviews.length === 0 ? (
          <Typography sx={{ color: theme.palette.text.secondary, mb: 4 }}>
            Inga recensioner ännu — bli den första!
          </Typography>
        ) : (
          <AnimatePresence>
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    mb: 2,
                    borderRadius: "12px",
                    background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)",
                    border: isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)",
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ backgroundColor: "#66c0f4", color: "#0b1a24", fontWeight: 800 }}>
                        {review.name[0]}
                      </Avatar>
                      <Box>
                        <Typography sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                          {review.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                          {new Date(review.createdAt).toLocaleDateString("sv-SE")}
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Rating value={review.rating} readOnly size="small" sx={{ color: "#66c0f4" }} />
                      <Button
                        size="small"
                        onClick={() => handleDelete(review.id)}
                        sx={{ color: "#ff6b6b", minWidth: "auto", fontSize: "0.75rem" }}
                      >
                        Ta bort
                      </Button>
                    </Stack>
                  </Stack>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    {review.text}
                  </Typography>
                </Paper>
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        <Divider sx={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)", my: 4 }} />

        {/* Skriv recension */}
        <Typography variant="h5" sx={{ fontWeight: 800, color: theme.palette.text.primary, mb: 3 }}>
          Skriv en recension
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: "16px",
            background: isDark
              ? "linear-gradient(180deg, #1f2f3d 0%, #16202d 100%)"
              : "linear-gradient(180deg, #ffffff 0%, #f0f4f8 100%)",
            border: isDark
              ? "1px solid rgba(255,255,255,0.07)"
              : "1px solid rgba(0,0,0,0.07)",
          }}
        >
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Ditt namn"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
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
                  value={form.rating}
                  onChange={(_, val) => setForm((prev) => ({ ...prev, rating: val }))}
                  sx={{ color: "#66c0f4" }}
                />
              </Box>
            </Box>
            <TextField
              fullWidth
              label="Din recension"
              value={form.text}
              onChange={(e) => setForm((prev) => ({ ...prev, text: e.target.value }))}
              multiline
              rows={4}
              sx={textFieldStyles}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!form.name || !form.rating || !form.text || submitting}
              sx={{
                backgroundColor: "#66c0f4",
                color: "#0b1a24",
                fontWeight: 800,
                borderRadius: "10px",
                "&:hover": { backgroundColor: "#8fd7ff" },
              }}
            >
              {submitting ? "Skickar..." : "Skicka recension"}
            </Button>
          </Box>
        </Paper>
      </PageContainer>
    </Box>
  );
}

export default ReviewsPage;