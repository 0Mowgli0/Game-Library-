import { useEffect, useState } from "react";
import {
  Box, Typography, Button, Paper, Stack, Divider, IconButton, TextField
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PageContainer from "../components/layout/PageContainer";
import Loading from "../components/common/Loading";
import gameService from "../services/gameService";
import { Link } from "react-router-dom";

const USER_ID = 1;

function CartPage() {
  const [cart, setCart] = useState({ games: [], total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await gameService.getCart(USER_ID);
        setCart(res.data);
      } catch (err) {
        console.error("Kunde inte hämta varukorg", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleRemove = async (gameId) => {
    try {
      const res = await gameService.removeFromCart(USER_ID, gameId);
      setCart(res.data);
    } catch (err) {
      console.error("Kunde inte ta bort spel", err);
    }
  };

  const handleUpdateAmount = async (gameId, newAmount) => {
    if (newAmount < 1) return;
    try {
      await gameService.removeFromCart(USER_ID, gameId);
      const res = await gameService.addToCart(USER_ID, gameId, newAmount);
      setCart(res.data);
    } catch (err) {
      console.error("Kunde inte uppdatera antal", err);
    }
  };

  const handleClear = async () => {
    try {
      await gameService.clearCart(USER_ID);
      setCart({ games: [], total: 0 });
    } catch (err) {
      console.error("Kunde inte tömma varukorg", err);
    }
  };

  if (loading) return <PageContainer><Loading /></PageContainer>;

  return (
    <PageContainer>
      <Typography variant="h4" sx={{ fontWeight: 900, color: "#ffffff", mb: 4 }}>
        Varukorg
      </Typography>

      {cart.games.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: "16px",
            background: "linear-gradient(180deg, #1f2f3d 0%, #16202d 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <ShoppingCartIcon sx={{ fontSize: 48, color: "#8fa7ba", mb: 2 }} />
          <Typography sx={{ color: "#8fa7ba", mb: 3 }}>
            Din varukorg är tom.
          </Typography>
          <Button
            component={Link}
            to="/games"
            variant="contained"
            sx={{
              backgroundColor: "#66c0f4",
              color: "#0b1a24",
              fontWeight: 800,
              "&:hover": { backgroundColor: "#8fd7ff" },
            }}
          >
            Gå till butiken
          </Button>
        </Paper>
      ) : (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: "16px",
            background: "linear-gradient(180deg, #1f2f3d 0%, #16202d 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {cart.games.map((game) => (
            <Box key={game.id}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{ py: 2 }}
              >
                <Box
                  component="img"
                  src={game.image || "https://placehold.co/80x80?text=Game"}
                  alt={game.title}
                  sx={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontWeight: 700, color: "#ffffff", mb: 0.5 }}>
                    {game.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#8fa7ba" }}>
                    {game.price} kr/st
                  </Typography>
                </Box>

                {/* Antal-väljare */}
                <Stack direction="row" alignItems="center" spacing={1}>
                  <IconButton
                    size="small"
                    onClick={() => handleUpdateAmount(game.id, game.amount - 1)}
                    sx={{
                      color: "#c7d5e0",
                      border: "1px solid rgba(255,255,255,0.15)",
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
                        backgroundColor: "rgba(255,255,255,0.08)",
                        color: "#ffffff",
                        borderRadius: "8px",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.15)",
                      },
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => handleUpdateAmount(game.id, game.amount + 1)}
                    sx={{
                      color: "#c7d5e0",
                      border: "1px solid rgba(255,255,255,0.15)",
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

                <IconButton
                  onClick={() => handleRemove(game.id)}
                  sx={{ color: "#ff6b6b" }}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
              <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />
            </Box>
          ))}

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 3 }}
          >
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
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="body2" sx={{ color: "#8fa7ba" }}>
                Totalt ({cart.games.reduce((acc, g) => acc + g.amount, 0)} st)
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 900, color: "#57cc99" }}>
                {cart.total} kr
              </Typography>
            </Box>
          </Stack>
        </Paper>
      )}
    </PageContainer>
  );
}

export default CartPage;