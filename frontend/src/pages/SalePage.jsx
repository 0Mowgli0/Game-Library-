import { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import PageContainer from "../components/layout/PageContainer";
import GameList from "../components/games/GameList";
import GameListSkeleton from "../components/games/GameListSkeleton";
import Breadcrumbs from "../components/common/Breadcrumbs";
import EmptyState from "../components/common/EmptyState";
import gameService from "../services/gameService";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

function SalePage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await gameService.getAllGames();
        const onSale = res.data
          .filter((g) => g.onSale && g.price && g.salePercentage)
          .sort((a, b) => b.salePercentage - a.salePercentage);
        setGames(onSale);
      } catch (err) {
        console.error("Kunde inte hämta spel", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          background: isDark
            ? "linear-gradient(135deg, #1a2f1a 0%, #1f3d1f 50%, #2a4a2a 100%)"
            : "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)",
          borderBottom: isDark
            ? "1px solid rgba(87,204,153,0.15)"
            : "1px solid rgba(87,204,153,0.3)",
          py: 6,
          px: { xs: 3, md: 8 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box sx={{
          position: "absolute", top: -60, right: -60,
          width: 300, height: 300, borderRadius: "50%",
          background: "rgba(87,204,153,0.08)",
          pointerEvents: "none",
        }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <LocalOfferIcon sx={{ fontSize: 40, color: "#57cc99" }} />
            <Typography variant="h3" sx={{ fontWeight: 900, color: isDark ? "#ffffff" : "#1a3a1a" }}>
              Bästa priserna
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ color: isDark ? "#8fa7ba" : "#2d5a2d", maxWidth: 500 }}>
            Här hittar du alla spel som just nu är på rea — sorterade efter högst rabatt!
          </Typography>
          {!loading && (
            <Typography variant="body2" sx={{ color: "#57cc99", fontWeight: 700, mt: 1 }}>
              {games.length} spel på rea just nu
            </Typography>
          )}
        </motion.div>
      </Box>

      <PageContainer>
        <Breadcrumbs
          crumbs={[
            { label: "Hem", to: "/" },
            { label: "Bästa priserna" },
          ]}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: theme.palette.text.primary }}>
            Spel på rea
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            {games.length} spel
          </Typography>
        </Box>

        {loading && <GameListSkeleton />}
        {!loading && games.length === 0 && (
          <EmptyState message="Inga spel på rea just nu — kolla tillbaka senare!" />
        )}
        {!loading && games.length > 0 && <GameList games={games} />}
      </PageContainer>
    </Box>
  );
}

export default SalePage;