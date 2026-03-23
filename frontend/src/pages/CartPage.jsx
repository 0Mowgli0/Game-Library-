import { useEffect, useState } from "react";
import {
  Box, Typography, Button, Paper, Stack, Divider, IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PageContainer from "../components/layout/PageContainer";
import Loading from "../components/common/Loading";
import gameService from "../services/gameService";

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
          <Typography sx={{ color: "#8fa7ba", mb: 2 }}>
            Din varukorg är tom.
          </Typography>
          <Button
            href="/games"
            variant="contained"
            sx={{
              backgroundColor: "#66c0f4",
              color: "#0b1a24",
              fontWeight: 800,
              "&:hover": { backgroundColor: "#8fd7ff" },
            }}
          >
            Bläddra spel
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
                  <Typography sx={{ fontWeight: 700, color: "#ffffff" }}>
                    {game.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#8fa7ba" }}>
                    Antal: {game.amount}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#8fa7ba" }}>
                    Pris: {game.price} kr/st
                  </Typography>
                </Box>
                <Typography sx={{ fontWeight: 800, color: "#66c0f4" }}>
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
                Totalt
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 900, color: "#66c0f4" }}>
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