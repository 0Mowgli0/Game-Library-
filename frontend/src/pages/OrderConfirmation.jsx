import { Box, Typography, Button, Paper, Stack, Divider } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import PageContainer from "../components/layout/PageContainer";

function OrderConfirmation() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const location = useLocation();
  const order = location.state?.order;

  return (
    <PageContainer>
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ width: "100%", maxWidth: 600 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 5,
              borderRadius: "20px",
              textAlign: "center",
              background: isDark
                ? "linear-gradient(180deg, #1f2f3d 0%, #16202d 100%)"
                : "linear-gradient(180deg, #ffffff 0%, #f0f4f8 100%)",
              border: isDark
                ? "1px solid rgba(87,204,153,0.3)"
                : "1px solid rgba(87,204,153,0.3)",
            }}
          >
            {/* Animerad checkmark */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircleIcon sx={{ fontSize: 80, color: "#57cc99", mb: 2 }} />
            </motion.div>

            <Typography variant="h4" sx={{ fontWeight: 900, color: theme.palette.text.primary, mb: 1 }}>
              Tack för din beställning!
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 4 }}>
              Din beställning är bekräftad och behandlas nu.
            </Typography>

            {order && (
              <>
                <Divider sx={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)", mb: 3 }} />

                <Typography variant="h6" sx={{ fontWeight: 800, color: theme.palette.text.primary, mb: 2, textAlign: "left" }}>
                  Ordersammanfattning
                </Typography>

                {order.games.map((game) => (
                  <Stack
                    key={game.id}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ py: 1 }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Box
                        component="img"
                        src={game.image || "https://placehold.co/50x50?text=Game"}
                        alt={game.title}
                        sx={{ width: 50, height: 50, borderRadius: "8px", objectFit: "cover" }}
                      />
                      <Box sx={{ textAlign: "left" }}>
                        <Typography sx={{ fontWeight: 700, color: theme.palette.text.primary, fontSize: "0.9rem" }}>
                          {game.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                          {game.amount} st × {game.price} kr
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography sx={{ fontWeight: 700, color: "#57cc99" }}>
                      {game.subtotal} kr
                    </Typography>
                  </Stack>
                ))}

                <Divider sx={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)", my: 2 }} />

                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: theme.palette.text.primary }}>
                    Totalt
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: "#57cc99" }}>
                    {order.total} kr
                  </Typography>
                </Stack>
              </>
            )}

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
                  Fortsätt shoppa
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  component={Link}
                  to="/orders"
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
                  Mina ordrar
                </Button>
              </motion.div>
            </Stack>
          </Paper>
        </motion.div>
      </Box>
    </PageContainer>
  );
}

export default OrderConfirmation;