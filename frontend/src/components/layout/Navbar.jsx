import {
  AppBar, Toolbar, Typography, Button, Box, Badge,
  IconButton, Tooltip, Avatar, Menu, MenuItem, Divider
} from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import { useUser } from "../../context/UserContext";

function Navbar() {
  const location = useLocation();
  const { cartCount } = useCart();
  const { mode, toggleTheme } = useTheme();
  const { users, currentUser, setCurrentUser } = useUser();
  const [anchorEl, setAnchorEl] = useState(null);
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

          {/* Användarmeny */}
          <Tooltip title={currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : "Välj användare"}>
            <IconButton
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{
                color: isDark ? "#c7d5e0" : "#4a6080",
                border: isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.15)",
                borderRadius: "8px",
                p: 0.5,
                "&:hover": { backgroundColor: "rgba(102,192,244,0.15)", color: "#66c0f4" },
              }}
            >
              <Avatar
                sx={{
                  width: 28,
                  height: 28,
                  backgroundColor: "#66c0f4",
                  color: "#0b1a24",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                }}
              >
                {currentUser ? currentUser.firstName[0] : <PersonIcon fontSize="small" />}
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            PaperProps={{
              sx: {
                background: isDark
                  ? "linear-gradient(180deg, #1f2f3d 0%, #16202d 100%)"
                  : "linear-gradient(180deg, #ffffff 0%, #f0f4f8 100%)",
                border: isDark
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid rgba(0,0,0,0.08)",
                borderRadius: "12px",
                mt: 1,
                minWidth: 200,
              },
            }}
          >
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="caption" sx={{ color: isDark ? "#8fa7ba" : "#6a8aaa", fontWeight: 700, letterSpacing: 1 }}>
                VÄLJ ANVÄNDARE
              </Typography>
            </Box>
            <Divider sx={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }} />
            {users.map((user) => (
              <MenuItem
                key={user.id}
                onClick={() => {
                  setCurrentUser(user);
                  setAnchorEl(null);
                }}
                selected={currentUser?.id === user.id}
                sx={{
                  gap: 1.5,
                  "&.Mui-selected": {
                    backgroundColor: "rgba(102,192,244,0.15)",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(102,192,244,0.1)",
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    backgroundColor: currentUser?.id === user.id ? "#66c0f4" : isDark ? "#2a475e" : "#e0eaf5",
                    color: currentUser?.id === user.id ? "#0b1a24" : isDark ? "#c7d5e0" : "#4a6080",
                    fontSize: "0.8rem",
                    fontWeight: 800,
                  }}
                >
                  {user.firstName[0]}
                </Avatar>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: "0.9rem", color: isDark ? "#ffffff" : "#0b1a24" }}>
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography variant="caption" sx={{ color: isDark ? "#8fa7ba" : "#6a8aaa" }}>
                    {user.email}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;