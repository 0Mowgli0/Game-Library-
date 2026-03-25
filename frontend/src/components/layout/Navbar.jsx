import {
  AppBar, Toolbar, Typography, Button, Box, Badge,
  IconButton, Tooltip,
} from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const location = useLocation();
  const { cartCount } = useCart();
  const { mode, toggleTheme } = useTheme();
  const { authUser, logout } = useAuth();
  const isDark = mode === "dark";

  const navButtonStyle = (path) => ({
    fontWeight: 700,
    borderRadius: "8px",
    px: 2,
    backgroundColor: location.pathname === path ? "#66c0f4" : "transparent",
    color: location.pathname === path ? "#0b1a24" : isDark ? "#c7d5e0" : "#4a6080",
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
        background: isDark
          ? "linear-gradient(90deg, #171a21 0%, #1b2838 100%)"
          : "linear-gradient(90deg, #ffffff 0%, #f0f4f8 100%)",
        borderBottom: isDark
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid rgba(0,0,0,0.08)",
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
            textDecoration: "none",
          }}
        >
          <SportsEsportsIcon />
          <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: 1, color: "#66c0f4" }}>
            GamerZone
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Button component={Link} to="/" sx={navButtonStyle("/")}>
            Hem
          </Button>
          <Button component={Link} to="/games" sx={navButtonStyle("/games")}>
            Spel
          </Button>
          <Button
            component={Link}
            to="/games/add"
            startIcon={<AddCircleOutlineIcon />}
            sx={navButtonStyle("/games/add")}
          >
            Lägg till
          </Button>
          <Button
            component={Link}
            to="/orders"
            startIcon={<ReceiptIcon />}
            sx={navButtonStyle("/orders")}
          >
            Ordrar
          </Button>
          <Button
            component={Link}
            to="/cart"
            sx={{
              ...navButtonStyle("/cart"),
              backgroundColor: location.pathname === "/cart" ? "#57cc99" : "rgba(87,204,153,0.15)",
              color: location.pathname === "/cart" ? "#0b1a24" : "#57cc99",
              border: "1px solid rgba(87,204,153,0.3)",
              "&:hover": {
                backgroundColor: "#57cc99",
                color: "#0b1a24",
              },
            }}
          >
            <Badge
              badgeContent={cartCount}
              color="error"
              sx={{ "& .MuiBadge-badge": { fontWeight: 800 } }}
            >
              <ShoppingCartIcon sx={{ mr: cartCount > 0 ? 1 : 0 }} />
            </Badge>
            Varukorg
          </Button>

          {/* Tema-toggle */}
          <Tooltip title={isDark ? "Ljust läge" : "Mörkt läge"}>
            <IconButton
              onClick={toggleTheme}
              sx={{
                color: isDark ? "#c7d5e0" : "#4a6080",
                border: isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.15)",
                borderRadius: "8px",
                "&:hover": { backgroundColor: "rgba(102,192,244,0.15)", color: "#66c0f4" },
              }}
            >
              {isDark ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

          {/* Login/Logout */}
          {authUser ? (
            <Tooltip title={`${authUser.firstName} ${authUser.lastName}`}>
              <Button
                onClick={logout}
                startIcon={<LogoutIcon />}
                sx={{
                  color: "#ff6b6b",
                  border: "1px solid rgba(255,107,107,0.3)",
                  borderRadius: "8px",
                  fontWeight: 700,
                  "&:hover": {
                    backgroundColor: "rgba(255,107,107,0.1)",
                    borderColor: "#ff6b6b",
                  },
                }}
              >
                Logga ut
              </Button>
            </Tooltip>
          ) : (
            <Button
              component={Link}
              to="/login"
              startIcon={<LoginIcon />}
              sx={{
                color: "#66c0f4",
                border: "1px solid rgba(102,192,244,0.3)",
                borderRadius: "8px",
                fontWeight: 700,
                "&:hover": {
                  backgroundColor: "rgba(102,192,244,0.1)",
                  borderColor: "#66c0f4",
                },
              }}
            >
              Logga in
            </Button>
          )}

          {/* Inloggad som */}
          {authUser && (
            <Tooltip title="Din profil">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2,
                  py: 0.5,
                  borderRadius: "8px",
                  border: isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.15)",
                  color: theme => theme.palette.text.secondary,
                }}
              >
                <PersonIcon sx={{ fontSize: 18, color: "#66c0f4" }} />
                <Typography variant="body2" sx={{ fontWeight: 700, color: "#66c0f4" }}>
                  {authUser.firstName}
                </Typography>
              </Box>
            </Tooltip>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;