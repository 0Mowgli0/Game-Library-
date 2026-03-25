import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box, Typography, TextField, Button, Paper, Stack, useTheme, InputAdornment, IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PageContainer from "../components/layout/PageContainer";
import { useAuth } from "../context/AuthContext";
import { useSnackbar } from "../context/SnackbarContext";

function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      showSnackbar("Lösenorden matchar inte!", "error");
      return;
    }
    if (formData.password.length < 6) {
      showSnackbar("Lösenordet måste vara minst 6 tecken!", "error");
      return;
    }
    setLoading(true);
    try {
      await register(formData.firstName, formData.lastName, formData.email, formData.password);
      showSnackbar("Konto skapat! Välkommen!", "success");
      navigate("/");
    } catch (err) {
      showSnackbar(err.response?.data?.message || "Kunde inte skapa konto", "error");
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
          py: 4,
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
                Skapa konto
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 0.5 }}>
                Gå med i GamerZone idag!
              </Typography>
            </Stack>

            <Box component="form" onSubmit={handleSubmit}>
              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  label="Förnamn"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: theme.palette.text.secondary, fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={textFieldStyles}
                />
                <TextField
                  fullWidth
                  label="Efternamn"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  sx={textFieldStyles}
                />
              </Stack>

              <TextField
                fullWidth
                label="E-post"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
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

              <TextField
                fullWidth
                label="Bekräfta lösenord"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: theme.palette.text.secondary, fontSize: 20 }} />
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
                  disabled={loading || !formData.firstName || !formData.email || !formData.password}
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
                  {loading ? "Skapar konto..." : "Skapa konto"}
                </Button>
              </motion.div>
            </Box>

            <Stack alignItems="center" sx={{ mt: 3 }}>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                Har du redan ett konto?{" "}
                <Link
                  to="/login"
                  style={{
                    color: "#66c0f4",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Logga in
                </Link>
              </Typography>
            </Stack>
          </Paper>
        </motion.div>
      </Box>
    </PageContainer>
  );
}

export default RegisterPage;