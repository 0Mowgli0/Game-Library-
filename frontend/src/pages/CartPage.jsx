import { useEffect, useState } from "react";
import {
  Box, Typography, Button, Paper, Stack, Divider, IconButton,
  TextField, useTheme, Chip, InputAdornment, Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import PaymentIcon from "@mui/icons-material/Payment";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PageContainer from "../components/layout/PageContainer";
import Loading from "../components/common/Loading";
import gameService from "../services/gameService";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "../context/SnackbarContext";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { motion, AnimatePresence } from "framer-motion";

function CartPage() {
  const [cart, setCart] = useState({ games: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [discountLoading, setDiscountLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const { showSnackbar } = useSnackbar();
  const { fetchCartCount } = useCart();
  const { currentUser } = useUser();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const navigate = useNavigate();

  const discountedTotal = appliedDiscount
    ? Math.round(cart.total * (1 - appliedDiscount.percentage / 100))
    : cart.total;

  const savedAmount = appliedDiscount ? cart.total - discountedTotal : 0;

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

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!currentUser) return;
      try {
        const res = await gameService.getRecommendations(currentUser.id);
        setRecommendations(res.data);
      } catch (err) {
        console.error("Kunde inte hämta rekommendationer", err);
      }
    };
    fetchRecommendations();
  }, [cart, currentUser]);

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
      setAppliedDiscount(null);
      setDiscountCode("");
      fetchCartCount();
      showSnackbar("Varukorgen är tömd", "info");
    } catch (err) {
      showSnackbar("Kunde inte tömma varukorg", "error");
    }
  };

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) return;
    setDiscountLoading(true);
    try {
      const res = await gameService.validateDiscount(discountCode.trim());
      setAppliedDiscount(res.data);
      showSnackbar(`Rabattkod aktiverad! ${res.data.percentage}% rabatt!`, "success");
    } catch (err) {
      showSnackbar("Ogiltig eller inaktiv rabattkod", "error");
      setAppliedDiscount(null);
    } finally {
      setDiscountLoading(false);
    }
  };

  const handleRemoveDiscount = () => {
    setAppliedDiscount(null);
    setDiscountCode("");
    showSnackbar("Rabattkod borttagen", "info");
  };

  const handlePay = async () => {
    setPaying(true);
    try {
      const res = await gameService.payCart(currentUser.id);
      const orderWithDiscount = {
        ...res.data,
        total: discountedTotal,
        discount: appliedDiscount,
        savedAmount,
      };
      setCart({ games: [], total: 0 });
      setAppliedDiscount(null);
      setDiscountCode("");
      fetchCartCount();
      showSnackbar("Betalning genomförd!", "success");
      navigate("/order-confirmation", { state: { order: orderWithDiscount } });
    } catch (err) {
      showSnackbar("Kunde inte genomföra betalning", "error");
    } finally {
      setPaying(false);
    }
  };

  const textFieldStyles = {
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

              {/* Rabattkod */}
              <Box sx={{ mt: 3, mb: 3 }}>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1, fontWeight: 700 }}>
                  Rabattkod
                </Typography>
                {appliedDiscount ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Chip
                        icon={<CheckCircleIcon sx={{ color: "#57cc99 !important" }} />}
                        label={`${appliedDiscount.code} — ${appliedDiscount.percentage}% rabatt`}
                        onDelete={handleRemoveDiscount}
                        sx={{
                          backgroundColor: "rgba(87,204,153,0.15)",
                          color: "#57cc99",
                          fontWeight: 700,
                          border: "1px solid rgba(87,204,153,0.3)",
                          "& .MuiChip-deleteIcon": { color: "#57cc99" },
                        }}
                      />
                      <Typography variant="body2" sx={{ color: "#57cc99", fontWeight: 700 }}>
                        Du sparar {savedAmount} kr!
                      </Typography>
                    </Stack>
                  </motion.div>
                ) : (
                  <Stack direction="row" spacing={1}>
                    <TextField
                      placeholder="Ange rabattkod..."
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                      onKeyDown={(e) => e.key === "Enter" && handleApplyDiscount()}
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocalOfferIcon sx={{ color: theme.palette.text.secondary, fontSize: 18 }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ ...textFieldStyles, flex: 1 }}
                    />
                    <Button
                      variant="outlined"
                      onClick={handleApplyDiscount}
                      disabled={discountLoading || !discountCode.trim()}
                      sx={{
                        color: "#66c0f4",
                        borderColor: "rgba(102,192,244,0.4)",
                        fontWeight: 700,
                        borderRadius: "10px",
                        "&:hover": {
                          borderColor: "#66c0f4",
                          backgroundColor: "rgba(102,192,244,0.1)",
                        },
                      }}
                    >
                      {discountLoading ? "Kollar..." : "Använd"}
                    </Button>
                  </Stack>
                )}
              </Box>

              <Divider sx={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", mb: 3 }} />

              <Stack direction="row" justifyContent="space-between" alignItems="center">
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

                  {appliedDiscount && (
                    <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
                      <Typography
                        variant="body1"
                        sx={{ color: theme.palette.text.secondary, textDecoration: "line-through" }}
                      >
                        {cart.total} kr
                      </Typography>
                      <Chip
                        label={`-${appliedDiscount.percentage}%`}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(87,204,153,0.15)",
                          color: "#57cc99",
                          fontWeight: 700,
                          fontSize: "0.75rem",
                        }}
                      />
                    </Stack>
                  )}

                  <Typography variant="h5" sx={{ fontWeight: 900, color: "#57cc99", mb: 2 }}>
                    {discountedTotal} kr
                  </Typography>

                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<PaymentIcon />}
                      onClick={handlePay}
                      disabled={paying}
                      sx={{
                        backgroundColor: "#57cc99",
                        color: "#0b1a24",
                        fontWeight: 800,
                        px: 4,
                        py: 1.5,
                        borderRadius: "12px",
                        "&:hover": { backgroundColor: "#3dba83" },
                        "&:disabled": { backgroundColor: "rgba(87,204,153,0.4)" },
                      }}
                    >
                      {paying ? "Behandlar..." : "Betala nu"}
                    </Button>
                  </motion.div>
                </Box>
              </Stack>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rekommenderade spel */}
      {recommendations.length > 0 && cart.games.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Box sx={{ mt: 5 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: theme.palette.text.primary, mb: 3 }}>
              Du kanske också gillar
            </Typography>
            <Grid container spacing={3}>
              {recommendations.map((game, index) => (
                <Grid item xs={12} sm={6} md={3} key={game.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        borderRadius: "14px",
                        overflow: "hidden",
                        background: isDark
                          ? "linear-gradient(180deg, #1f2f3d 0%, #16202d 100%)"
                          : "linear-gradient(180deg, #ffffff 0%, #f0f4f8 100%)",
                        border: isDark
                          ? "1px solid rgba(255,255,255,0.08)"
                          : "1px solid rgba(0,0,0,0.08)",
                        transition: "border-color 0.3s ease",
                        "&:hover": { borderColor: "rgba(102,192,244,0.5)" },
                      }}
                    >
                      <Box
                        component="img"
                        src={game.image || "https://placehold.co/300x160?text=Game"}
                        alt={game.title}
                        sx={{ width: "100%", height: 140, objectFit: "cover" }}
                      />
                      <Box sx={{ p: 2 }}>
                        <Typography sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 0.5, fontSize: "0.9rem" }}>
                          {game.title}
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
                          {game.Genre && (
                            <Chip
                              label={game.Genre.name}
                              size="small"
                              sx={{ backgroundColor: "#66c0f4", color: "#0b1a24", fontWeight: 700, fontSize: "0.7rem" }}
                            />
                          )}
                        </Stack>
                        {game.price && (
                          <Typography sx={{ color: "#57cc99", fontWeight: 800, mb: 1.5 }}>
                            {game.price} kr
                          </Typography>
                        )}
                        <Stack direction="row" spacing={1}>
                          <Button
                            fullWidth
                            variant="contained"
                            size="small"
                            startIcon={<ShoppingCartIcon />}
                            onClick={async () => {
                              try {
                                await gameService.addToCart(currentUser.id, game.id, 1);
                                const res = await gameService.getCart(currentUser.id);
                                setCart(res.data);
                                fetchCartCount();
                                showSnackbar(`${game.title} lades till i varukorgen!`);
                              } catch (err) {
                                showSnackbar("Kunde inte lägga till i varukorgen", "error");
                              }
                            }}
                            sx={{
                              backgroundColor: "#57cc99",
                              color: "#0b1a24",
                              fontWeight: 700,
                              "&:hover": { backgroundColor: "#3dba83" },
                            }}
                          >
                            Köp
                          </Button>
                          <Button
                            component={Link}
                            to={`/games/${game.id}`}
                            variant="outlined"
                            size="small"
                            sx={{
                              color: isDark ? "#c7d5e0" : "#4a6080",
                              borderColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
                              "&:hover": { borderColor: "#66c0f4", color: "#66c0f4" },
                            }}
                          >
                            Info
                          </Button>
                        </Stack>
                      </Box>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>
      )}
    </PageContainer>
  );
}

export default CartPage;