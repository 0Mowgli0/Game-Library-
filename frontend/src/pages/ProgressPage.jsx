import { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography, Chip } from "@mui/material";
import PageContainer from "../components/layout/PageContainer";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import gameService from "../services/gameService";

const statusColors = {
  Spelar: "#66c0f4",
  Pausat: "#f4a261",
  Klar: "#57cc99",
  Planerar: "#a8a8b3",
};

function StatCard({ label, value }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: "16px",
        background: "linear-gradient(180deg, #1f2f3d 0%, #16202d 100%)",
        border: "1px solid rgba(255,255,255,0.07)",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 900, color: "#66c0f4" }}>
        {value}
      </Typography>
      <Typography variant="body2" sx={{ color: "#8fa7ba", mt: 1 }}>
        {label}
      </Typography>
    </Paper>
  );
}

function ProgressPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await gameService.getAllGames();
        setGames(response.data);
      } catch (err) {
        setError("Kunde inte hämta spel.");
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  if (loading) return <PageContainer><Loading /></PageContainer>;
  if (error) return <PageContainer><ErrorMessage message={error} /></PageContainer>;

  const total = games.length;

  const statusCount = ["Spelar", "Pausat", "Klar", "Planerar"].map((s) => ({
    status: s,
    count: games.filter((g) => g.status === s).length,
  }));

  const genreCount = games.reduce((acc, g) => {
    const genre = g.Genre?.name || g.genre?.trim() || "Okänd";
    acc[genre] = (acc[genre] || 0) + 1;
    return acc;
  }, {});
  const favoritGenre = Object.entries(genreCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "–";

  const recent = [...games]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <PageContainer>
      <Typography variant="h4" sx={{ fontWeight: 900, color: "#ffffff", mb: 4 }}>
        Din progress
      </Typography>

      {/* Statistikkort */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        <Grid item xs={6} md={3}>
          <StatCard label="Totalt antal spel" value={total} />
        </Grid>
        {statusCount.map(({ status, count }) => (
          <Grid item xs={6} md={3} key={status}>
            <StatCard label={status} value={count} />
          </Grid>
        ))}
      </Grid>

      {/* Diagram */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 5,
          borderRadius: "16px",
          background: "linear-gradient(180deg, #1f2f3d 0%, #16202d 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 800, color: "#ffffff", mb: 3 }}>
          Spel per status
        </Typography>
        {statusCount.map(({ status, count }) => {
          const percent = total > 0 ? Math.round((count / total) * 100) : 0;
          return (
            <Box key={status} sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                <Typography variant="body2" sx={{ color: "#c7d5e0" }}>{status}</Typography>
                <Typography variant="body2" sx={{ color: "#8fa7ba" }}>{count} spel</Typography>
              </Box>
              <Box sx={{ height: 10, borderRadius: "8px", backgroundColor: "rgba(255,255,255,0.08)" }}>
                <Box
                  sx={{
                    height: "100%",
                    width: `${percent}%`,
                    borderRadius: "8px",
                    backgroundColor: statusColors[status],
                    transition: "width 0.6s ease",
                  }}
                />
              </Box>
            </Box>
          );
        })}
      </Paper>

      {/* Favoritgenre + senaste spel */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: "100%",
              borderRadius: "16px",
              background: "linear-gradient(180deg, #1f2f3d 0%, #16202d 100%)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800, color: "#ffffff", mb: 2 }}>
              Favoritgenre
            </Typography>
            <Chip
              label={favoritGenre}
              sx={{ backgroundColor: "#66c0f4", color: "#0b1a24", fontWeight: 700, fontSize: "1rem", px: 1 }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "16px",
              background: "linear-gradient(180deg, #1f2f3d 0%, #16202d 100%)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800, color: "#ffffff", mb: 2 }}>
              Senast tillagda
            </Typography>
            {recent.map((g) => (
              <Box
                key={g.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 1.5,
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  "&:last-child": { borderBottom: "none" },
                }}
              >
                <Typography sx={{ color: "#ffffff", fontWeight: 700 }}>{g.title}</Typography>
                <Chip
                  label={g.status}
                  size="small"
                  sx={{
                    backgroundColor: statusColors[g.status] || "#a8a8b3",
                    color: "#0b1a24",
                    fontWeight: 700,
                  }}
                />
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </PageContainer>
  );
}

export default ProgressPage;