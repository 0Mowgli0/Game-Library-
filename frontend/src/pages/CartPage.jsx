// CartPage.jsx - byt ut USER_ID mot currentUser
import { useEffect, useState } from "react";
import {
  Box, Typography, Button, Paper, Stack, Divider, IconButton, TextField, useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import PageContainer from "../components/layout/PageContainer";
import Loading from "../components/common/Loading";
import gameService from "../services/gameService";
import { Link } from "react-router-dom";
import { useSnackbar } from "../context/SnackbarContext";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { motion, AnimatePresence } from "framer-motion";

function CartPage() {
  const [cart, setCart] = useState({ games: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const { showSnackbar } = useSnackbar();
  const { fetchCartCount } = useCart();
  const { currentUser } = useUser();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  useEffect(() => {
    const fetchCart = async () => {
      if (!currentUser) return;
      try {
        const res = await gameService.getCart(currentUser.id);
        setCart(res.data);
      } catch (err) {
        console.error("Kunde inte hämta varukorg", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [currentUser]);

  const handleRemove = async (gameId) => {
    try {
      const res = await gameService.removeFromCart(currentUser.id, gameId);
      setCart(res.data);
      fetchCartCount();
      showSnackbar("Spel borttaget från varukorgen", "info");
    } catch (err) {
      showSnackbar("Kunde inte ta bort spel", "error");
    }
  };

  const handleUpdateAmount = async (gameId, newAmount) => {
    if (newAmount < 1) return;
    try {
      await gameService.removeFromCart(currentUser.id, gameId);
      const res = await gameService.addToCart(currentUser.id, gameId, newAmount);
      setCart(res.data);
      fetchCartCount();
    } catch (err) {
      showSnackbar("Kunde inte uppdatera antal", "error");
    }
  };

  const handleClear = async () => {
    try {
      await gameService.clearCart(currentUser.id);
      setCart({ games: [], total: 0 });
      fetchCartCount();
      showSnackbar("Varukorgen är tömd", "info");
    } catch (err) {
      showSnackbar("Kunde inte tömma varukorg", "error");
    }
  };

  if (loading) return <PageContainer><Loading /></PageContainer>;

  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 900, color: theme.palette.text.primary }}>
            Varukorg
          </Typography>
          {currentUser && (
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              Inloggad som: <strong style={{ color: "#66c0f4" }}>{currentUser.firstName} {currentUser.lastName}</strong>
            </Typography>
          )}
        </Stack>
      </motion.div>

      <AnimatePresence mode="wait">
        {cart.games.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 8,
                textAlign: "center",
                borderRadius: "20px",
                background: isDark
                  ? "linear-gradient(180deg, #1f2f3d 0%, #16202d 100%)"
                  : "linear-gradient(180deg, #ffffff 0%, #f0f4f8 100%)",
                border: isDark
                  ? "1px solid rgba(255,255,255,0.07)"
                  : "1px solid rgba(0,0,0,0.07)",
              }}
            >
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, -5, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
              >
                <ShoppingCartIcon sx={{ fontSize: 80, color: isDark ? "#2a475e" : "#c0cfe0", mb: 2 }} />
              </motion.div>

              <Typography variant="h5" sx={{ color: theme.palette.text.primary, fontWeight: 800, mb: 1 }}>
                Din varukorg är tom
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 4, maxWidth: 400, mx: "auto" }}>
                Det verkar som att du inte har lagt till några spel ännu. Utforska vår butik och hitta ditt nästa favoritspel!
              </Typography>

              <Stack direction="row" spacing={2} justifyContent="center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    component={Link}
                    to="/games"
                    variant="contained"
                    size="large"
                    startIcon={<SportsEsportsIcon />}
                    sx={{
                      backgroundColor: "#66c0f4",
                      color: "#0b1a24",
                      fontWeight: 800,
                      px: 4,
                      py: 1.5,
                      borderRadius: "12px",
                      "&:hover": { backgroundColor: "#8fd7ff" },
                    }}
                  >
                    Utforska butiken
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    component={Link}
                    to="/"
                    variant="outlined"
                    size="large"
                    sx={{
                      color: theme.palette.text.secondary,
                      borderColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
                      fontWeight: 700,
                      px: 4,
                      py: 1.5,
                      borderRadius: "12px",
                      "&:hover": { borderColor: "#66c0f4", color: "#66c0f4" },
                    }}
                  >
                    Tillbaka till hem
                  </Button>
                </motion.div>
              </Stack>
            </Paper>
          </motion.div>
        ) : (
          <motion.div
            key="cart"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
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
              <AnimatePresence>
                {cart.games.map((game) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ py: 2 }}>
                      <Box
                        component="img"
                        src={game.image || "https://placehold.co/80x80?text=Game"}
                        alt={game.title}
                        sx={{ width: 80, height: 80, objectFit: "cover", borderRadius: "8px" }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 0.5 }}>
                          {game.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                          {game.price} kr/st
                        </Typography>
                      </Box>

                      <Stack direction="row" alignItems="center" spacing={1}>
                        <IconButton
                          size="small"
                          onClick={() => handleUpdateAmount(game.id, game.amount - 1)}
                          sx={{
                            color: theme.palette.text.secondary,
                            border: isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.15)",
                            borderRadius: "8px",
                            width: 32,
                            height: 32,
                          }}
                        >
                          −
                        </IconButton>
                        <TextField
                          value={game.amount}
                          onChange={(e) => handleUpdateAmount(game.id, parseInt(e.target.value) || 1)}
                          inputProps={{ min: 1, style: { textAlign: "center", padding: "4px" } }}
                          sx={{
                            width: 50,
                            "& .MuiOutlinedInput-root": {
                              backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
                              color: theme.palette.text.primary,
                              borderRadius: "8px",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)",
                            },
                          }}
                        />
                        <IconButton
                          size="small"
                          onClick={() => handleUpdateAmount(game.id, game.amount + 1)}
                          sx={{
                            color: theme.palette.text.secondary,
                            border: isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.15)",
                            borderRadius: "8px",
                            width: 32,
                            height: 32,
                          }}
                        >
                          +
                        </IconButton>
                      </Stack>

                      <Typography sx={{ fontWeight: 800, color: "#57cc99", minWidth: 80, textAlign: "right" }}>
                        {game.subtotal} kr
                      </Typography>

                      <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                        <IconButton onClick={() => handleRemove(game.id)} sx={{ color: "#ff6b6b" }}>
                          <DeleteIcon />
                        </IconButton>
                      </motion.div>
                    </Stack>
                    <Divider sx={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }} />
                  </motion.div>
                ))}
              </AnimatePresence>

              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 3 }}>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    onClick={handleClear}
                    variant="outlined"
                    sx={{
                      color: "#ff6b6b",
                      borderColor: "rgba(255,107,107,0.4)",
                      fontWeight: 700,
                      "&:hover": {
                        borderColor: "#ff6b6b",
                        backgroundColor: "rgba(255,107,107,0.08)",
                      },
                    }}
                  >
                    Töm varukorg
                  </Button>
                </motion.div>
                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    Totalt ({cart.games.reduce((acc, g) => acc + g.amount, 0)} st)
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: "#57cc99" }}>
                    {cart.total} kr
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
    </PageContainer>
  );
}

export default CartPage;