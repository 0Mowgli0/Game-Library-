import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const navButtonStyle = (path) => ({
    color: "#c7d5e0",
    fontWeight: 700,
    borderRadius: "8px",
    px: 2,
    backgroundColor: location.pathname === path ? "#66c0f4" : "transparent",
    color: location.pathname === path ? "#0b1a24" : "#c7d5e0",
    "&:hover": {
      backgroundColor: "#66c0f4",
      color: "#0b1a24",
    },
  });

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "linear-gradient(90deg, #171a21 0%, #1b2838 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "#66c0f4",
          }}
        >
          <SportsEsportsIcon />
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 0.5 }}>
            Game Library
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button component={Link} to="/" sx={navButtonStyle("/")}>
            Hem
          </Button>
          <Button component={Link} to="/games" sx={navButtonStyle("/games")}>
            Spel
          </Button>
          <Button component={Link} to="/games/add" sx={navButtonStyle("/games/add")}>
            Lägg till
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;