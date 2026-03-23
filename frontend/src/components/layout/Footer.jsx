import { Box, Container, Grid, Typography, IconButton, Divider, Stack, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link as RouterLink } from "react-router-dom";

function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        background: isDark
          ? "linear-gradient(180deg, #0f1923 0%, #0a1118 100%)"
          : "linear-gradient(180deg, #e0eaf5 0%, #c8daf0 100%)",
        borderTop: isDark
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid rgba(0,0,0,0.06)",
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 4 }}>

          {/* Logo & beskrivning */}
          <Grid item xs={12} md={4}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <SportsEsportsIcon sx={{ color: "#66c0f4", fontSize: 28 }} />
              <Typography variant="h6" sx={{ fontWeight: 900, color: "#66c0f4", letterSpacing: 1 }}>
                GamerZone
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 2, lineHeight: 1.8 }}>
              Din ultimata destination för spel. Hitta, köp och recensera de senaste och bästa spelen till de bästa priserna.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton
                href="https://github.com"
                target="_blank"
                sx={{
                  color: theme.palette.text.secondary,
                  border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
                  borderRadius: "8px",
                  "&:hover": { color: "#66c0f4", borderColor: "#66c0f4" },
                }}
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
              <IconButton
                href="https://twitter.com"
                target="_blank"
                sx={{
                  color: theme.palette.text.secondary,
                  border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
                  borderRadius: "8px",
                  "&:hover": { color: "#66c0f4", borderColor: "#66c0f4" },
                }}
              >
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton
                href="https://instagram.com"
                target="_blank"
                sx={{
                  color: theme.palette.text.secondary,
                  border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
                  borderRadius: "8px",
                  "&:hover": { color: "#66c0f4", borderColor: "#66c0f4" },
                }}
              >
                <InstagramIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Grid>

          {/* Snabblänkar */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: theme.palette.text.primary, mb: 2, letterSpacing: 1 }}>
              NAVIGERING
            </Typography>
            <Stack spacing={1}>
              {[
                { label: "Hem", to: "/" },
                { label: "Butik", to: "/games" },
                { label: "Varukorg", to: "/cart" },
                { label: "Lägg till spel", to: "/games/add" },
              ].map((link) => (
                <Link
                  key={link.label}
                  component={RouterLink}
                  to={link.to}
                  sx={{
                    color: theme.palette.text.secondary,
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    "&:hover": { color: "#66c0f4" },
                    transition: "color 0.2s ease",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Kategorier */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: theme.palette.text.primary, mb: 2, letterSpacing: 1 }}>
              KATEGORIER
            </Typography>
            <Stack spacing={1}>
              {["Action", "Sport", "RPG", "FPS", "Adventure", "Strategy"].map((genre) => (
                <Link
                  key={genre}
                  component={RouterLink}
                  to="/games"
                  sx={{
                    color: theme.palette.text.secondary,
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    "&:hover": { color: "#66c0f4" },
                    transition: "color 0.2s ease",
                  }}
                >
                  {genre}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Kontakt */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: theme.palette.text.primary, mb: 2, letterSpacing: 1 }}>
              KONTAKT
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                📧 support@gamerzone.se
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                📞 +46 70 123 45 67
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                📍 Stockholm, Sverige
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                🕐 Mån-Fre 09:00 - 18:00
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", mb: 3 }} />

        <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            © 2026 GamerZone. Alla rättigheter förbehållna.
          </Typography>
          <Stack direction="row" spacing={3}>
            {["Integritetspolicy", "Användarvillkor", "Cookies"].map((item) => (
              <Link
                key={item}
                href="#"
                sx={{
                  color: theme.palette.text.secondary,
                  textDecoration: "none",
                  fontSize: "0.8rem",
                  "&:hover": { color: "#66c0f4" },
                }}
              >
                {item}
              </Link>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;