// Home.jsx
import { Box, Button, Stack, Typography, Grid, Paper, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import StarIcon from "@mui/icons-material/Star";
import SecurityIcon from "@mui/icons-material/Security";
import PageContainer from "../components/layout/PageContainer";

const features = [
  {
    icon: <LocalOfferIcon sx={{ fontSize: 32, color: "#57cc99" }} />,
    title: "Bästa priserna",
    desc: "Vi erbjuder konkurrenskraftiga priser på alla spel.",
    to: "/games?sort=price",
  },
  {
    icon: <StarIcon sx={{ fontSize: 32, color: "#66c0f4" }} />,
    title: "Toppbetyg",
    desc: "Läs recensioner och betyg från andra spelare.",
    to: "/games?sort=rating",
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 32, color: "#f4a261" }} />,
    title: "Trygg handel",
    desc: "Säker och enkel handel med snabb leverans.",
    to: "/games",
  },
];

function Home() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <PageContainer>
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 5,
        }}
      >
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Box
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: "20px",
              background: isDark
                ? "linear-gradient(135deg, #1b2838 0%, #1f2f3d 60%, #2a475e 100%)"
                : "linear-gradient(135deg, #e0eaf5 0%, #c8daf0 60%, #b0cce8 100%)",
              border: isDark
                ? "1px solid rgba(102,192,244,0.2)"
                : "1px solid rgba(102,192,244,0.3)",
              boxShadow: isDark
                ? "0 20px 50px rgba(0,0,0,0.4)"
                : "0 20px 50px rgba(0,0,0,0.1)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: -60,
                right: -60,
                width: 250,
                height: 250,
                borderRadius: "50%",
                background: isDark
                  ? "rgba(102,192,244,0.06)"
                  : "rgba(102,192,244,0.12)",
                pointerEvents: "none",
              }}
            />

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
              >
                <SportsEsportsIcon sx={{ fontSize: 48, color: "#66c0f4" }} />
              </motion.div>
              <Typography variant="h2" sx={{ fontWeight: 900, color: theme.palette.text.primary, lineHeight: 1 }}>
                GamerZone
              </Typography>
            </Box>

            <Typography variant="h6" sx={{ color: theme.palette.text.secondary, mb: 1, maxWidth: 600, lineHeight: 1.7 }}>
              Din ultimata destination för spel. Hitta, köp och recensera de senaste och bästa spelen.
            </Typography>

            <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 4, maxWidth: 500 }}>
              Hundratals spel till de bästa priserna — för alla plattformar och genres.
            </Typography>

            <Stack direction="row" spacing={2} flexWrap="wrap">
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
                  Shoppa nu
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  component={Link}
                  to="/cart"
                  variant="outlined"
                  size="large"
                  startIcon={<LocalOfferIcon />}
                  sx={{
                    color: theme.palette.text.secondary,
                    borderColor: isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)",
                    fontWeight: 700,
                    px: 4,
                    py: 1.5,
                    borderRadius: "12px",
                    "&:hover": {
                      borderColor: "#66c0f4",
                      color: "#66c0f4",
                    },
                  }}
                >
                  Min varukorg
                </Button>
              </motion.div>
            </Stack>
          </Box>
        </motion.div>

        {/* Feature-kort */}
        <Grid container spacing={3}>
          {features.map((f, i) => (
            <Grid item xs={12} md={4} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Paper
                  component={Link}
                  to={f.to}
                  elevation={0}
                  sx={{
                    p: 3,
                    height: "100%",
                    borderRadius: "16px",
                    textDecoration: "none",
                    display: "block",
                    background: isDark
                      ? "linear-gradient(180deg, #1f2f3d 0%, #16202d 100%)"
                      : "linear-gradient(180deg, #ffffff 0%, #f0f4f8 100%)",
                    border: isDark
                      ? "1px solid rgba(255,255,255,0.07)"
                      : "1px solid rgba(0,0,0,0.07)",
                    transition: "border-color 0.25s ease, box-shadow 0.25s ease",
                    "&:hover": {
                      border: "1px solid rgba(102,192,244,0.35)",
                      boxShadow: isDark
                        ? "0 12px 28px rgba(0,0,0,0.3)"
                        : "0 12px 28px rgba(0,0,0,0.1)",
                      cursor: "pointer",
                    },
                  }}
                >
                  <Box sx={{ mb: 2 }}>{f.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: theme.palette.text.primary, mb: 1 }}>
                    {f.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    {f.desc}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </PageContainer>
  );
}

export default Home;