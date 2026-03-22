import { useEffect, useState } from "react";
import { Box, Tab, Tabs, Typography, Grid, Card, CardContent, CardMedia, Chip, Button } from "@mui/material";
import { Link } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import gameService from "../services/gameService";

const STATUSES = ["Spelar", "Pausat", "Klar"];

function StatusPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState(0);

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

  const currentStatus = STATUSES[activeTab];
  const filtered = games.filter((g) => g.status === currentStatus);

  return (
    <PageContainer>
      <Typography variant="h4" sx={{ fontWeight: 900, color: "#ffffff", mb: 3 }}>
        Håll koll
      </Typography>

      <Tabs
        value={activeTab}
        onChange={(_, val) => setActiveTab(val)}
        sx={{
          mb: 4,
          "& .MuiTab-root": { color: "#c7d5e0", fontWeight: 700 },
          "& .Mui-selected": { color: "#66c0f4" },
          "& .MuiTabs-indicator": { backgroundColor: "#66c0f4" },
        }}
      >
        {STATUSES.map((s) => (
          <Tab
            key={s}
            label={`${s} (${games.filter((g) => g.status === s).length})`}
          />
        ))}
      </Tabs>

      {filtered.length === 0 ? (
        <Typography sx={{ color: "#8fa7ba" }}>
          Inga spel med status "{currentStatus}".
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filtered.map((game) => (
            <Grid item xs={12} sm={6} md={4} key={game.id}>
              <Card
                sx={{
                  height: "100%",
                  background: "linear-gradient(180deg, #1f2f3d 0%, #16202d 100%)",
                  borderRadius: "14px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    borderColor: "rgba(102,192,244,0.4)",
                    boxShadow: "0 12px 28px rgba(0,0,0,0.3)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={game.image || "https://placehold.co/600x400?text=Game"}
                  alt={game.title}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#ffffff", mb: 1 }}>
                    {game.title}
                  </Typography>
                  <Chip
                    label={game.genre || "Okänd genre"}
                    size="small"
                    sx={{ backgroundColor: "#66c0f4", color: "#0b1a24", fontWeight: 700, mb: 2 }}
                  />
                  <Box>
                    <Button
                      component={Link}
                      to={`/games/${game.id}`}
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: "#66c0f4",
                        color: "#0b1a24",
                        fontWeight: 700,
                        "&:hover": { backgroundColor: "#8fd7ff" },
                      }}
                    >
                      Läs mer
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </PageContainer>
  );
}

export default StatusPage;