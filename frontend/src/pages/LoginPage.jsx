import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box, Typography, TextField, Button, Paper, Stack, useTheme, InputAdornment, IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PageContainer from "../components/layout/PageContainer";
import { useAuth } from "../context/AuthContext";
import { useSnackbar } from "../context/SnackbarContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      showSnackbar("Välkommen tillbaka!", "success");
      navigate("/");
    } catch (err) {
      showSnackbar(err.response?.data?.message || "Fel e-post eller lösenord", "error");
    } finally {
      setLoading(false);
    }
  };

  const textFieldStyles = {
    mb: 2,
    "& .MuiOutlinedInput-root": {
      backgroundColor: isDark ? "#2a475e" : "#ffffff",
      color: theme.palette.text.primary,
      borderRadius: "10px",
    },
    "& .MuiInputLabel-root": { color: theme.palette.text.secondary },
    "& .MuiInputLabel-root.Mui-focused": { color: "#66c0f4" },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
    },
  };

  return (
    <PageContainer>
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: "100%", maxWidth: 480 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 5,
              borderRadius: "20px",
              background: isDark
                ? "linear-gradient(180deg, #1f2f3d 0%, #16202d 100%)"
                : "linear-gradient(180deg, #ffffff 0%, #f0f4f8 100%)",
              border: isDark
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(0,0,0,0.08)",
              boxShadow: isDark
                ? "0 12px 28px rgba(0,0,0,0.25)"
                : "0 12px 28px rgba(0,0,0,0.08)",
            }}
          >
            {/* Logo */}
            <Stack alignItems="center" sx={{ mb: 4 }}>
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <SportsEsportsIcon sx={{ fontSize: 50, color: "#66c0f4", mb: 1 }} />
              </motion.div>
              <Typography variant="h4" sx={{ fontWeight: 900, color: theme.palette.text.primary }}>
                Logga in
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 0.5 }}>
                Välkommen tillbaka till GamerZone!
              </Typography>
            </Stack>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="E-post"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: theme.palette.text.secondary, fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={textFieldStyles}
              />
              <TextField
                fullWidth
                label="Lösenord"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: theme.palette.text.secondary, fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword
                          ? <VisibilityOffIcon sx={{ color: theme.palette.text.secondary }} />
                          : <VisibilityIcon sx={{ color: theme.palette.text.secondary }} />
                        }
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={textFieldStyles}
              />

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading || !email || !password}
                  sx={{
                    py: 1.5,
                    backgroundColor: "#66c0f4",
                    color: "#0b1a24",
                    fontWeight: 800,
                    fontSize: "1rem",
                    borderRadius: "10px",
                    "&:hover": { backgroundColor: "#8fd7ff" },
                    "&:disabled": { backgroundColor: "rgba(102,192,244,0.4)" },
                  }}
                >
                  {loading ? "Loggar in..." : "Logga in"}
                </Button>
              </motion.div>
            </Box>

            <Stack alignItems="center" sx={{ mt: 3 }}>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                Har du inget konto?{" "}
                <Link
                  to="/register"
                  style={{
                    color: "#66c0f4",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Registrera dig
                </Link>
              </Typography>
            </Stack>
          </Paper>
        </motion.div>
      </Box>
    </PageContainer>
  );
}

export default LoginPage;