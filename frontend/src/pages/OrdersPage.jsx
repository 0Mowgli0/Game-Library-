import { useEffect, useState } from "react";
import {
  Box, Typography, Paper, Stack, Divider, Chip, useTheme, Pagination, Button,
} from "@mui/material";
import { motion } from "framer-motion";
import PageContainer from "../components/layout/PageContainer";
import Loading from "../components/common/Loading";
import Breadcrumbs from "../components/common/Breadcrumbs";
import gameService from "../services/gameService";
import { useUser } from "../context/UserContext";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { Link } from "react-router-dom";

const ORDERS_PER_PAGE = 4;

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const { currentUser } = useUser();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE);
  const paginatedOrders = orders.slice(
    (page - 1) * ORDERS_PER_PAGE,
    page * ORDERS_PER_PAGE
  );

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) return;
      try {
        const res = await gameService.getOrderHistory(currentUser.id);
        setOrders(res.data);
      } catch (err) {
        console.error("Kunde inte hämta orderhistorik", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [currentUser]);

  if (loading) return <PageContainer><Loading /></PageContainer>;

  return (
    <PageContainer>
      <Breadcrumbs
        crumbs={[
          { label: "Hem", to: "/" },
          { label: "Mina ordrar" },
        ]}
      />

      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900, color: theme.palette.text.primary }}>
            Mina ordrar
          </Typography>
          {orders.length > 0 && (
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 0.5 }}>
              {orders.length} ordrar totalt
            </Typography>
          )}
        </Box>
        {currentUser && (
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            Inloggad som: <strong style={{ color: "#66c0f4" }}>{currentUser.firstName} {currentUser.lastName}</strong>
          </Typography>
        )}
      </Stack>

      {orders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
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
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              <ReceiptIcon sx={{ fontSize: 80, color: isDark ? "#2a475e" : "#c0cfe0", mb: 2 }} />
            </motion.div>
            <Typography variant="h5" sx={{ color: theme.palette.text.primary, fontWeight: 800, mb: 1 }}>
              Inga ordrar ännu
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 4 }}>
              Du har inte gjort några beställningar ännu. Gå till butiken och hitta ditt nästa favoritspel!
            </Typography>
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
              Gå till butiken
            </Button>
          </Paper>
        </motion.div>
      ) : (
        <>
          <Stack spacing={3}>
            {paginatedOrders.map((order, index) => (
              <motion.div
                key={order.orderId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
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
                  {/* Order header */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: theme.palette.text.primary }}>
                        Order #{order.orderId}
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        {new Date(order.date).toLocaleDateString("sv-SE", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Typography>
                    </Box>
                    <Chip
                      label="Betald"
                      sx={{
                        backgroundColor: "rgba(87,204,153,0.15)",
                        color: "#57cc99",
                        fontWeight: 700,
                        border: "1px solid rgba(87,204,153,0.3)",
                      }}
                    />
                  </Stack>

                  <Divider sx={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", mb: 3 }} />

                  {/* Spel i ordern */}
                  <Stack spacing={2} sx={{ mb: 3 }}>
                    {order.games.map((game) => (
                      <Stack
                        key={game.id}
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        spacing={2}
                      >
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Box
                            component="img"
                            src={game.image || "https://placehold.co/60x60?text=Game"}
                            alt={game.title}
                            sx={{
                              width: 60,
                              height: 60,
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                          <Box>
                            <Typography sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
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
                  </Stack>

                  <Divider sx={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", mb: 2 }} />

                  {/* Totalt */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      {order.games.reduce((acc, g) => acc + g.amount, 0)} st spel
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 900, color: "#57cc99" }}>
                      Totalt: {order.total} kr
                    </Typography>
                  </Stack>
                </Paper>
              </motion.div>
            ))}
          </Stack>

          {/* Paginering */}
          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, val) => {
                  setPage(val);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: theme.palette.text.secondary,
                    border: isDark
                      ? "1px solid rgba(255,255,255,0.1)"
                      : "1px solid rgba(0,0,0,0.1)",
                    borderRadius: "8px",
                  },
                  "& .MuiPaginationItem-root.Mui-selected": {
                    backgroundColor: "#66c0f4",
                    color: "#0b1a24",
                    fontWeight: 800,
                    border: "none",
                  },
                  "& .MuiPaginationItem-root:hover": {
                    backgroundColor: "rgba(102,192,244,0.15)",
                    color: "#66c0f4",
                  },
                }}
              />
            </Box>
          )}
        </>
      )}
    </PageContainer>
  );
}

export default OrdersPage;