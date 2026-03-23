import { Box, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PageContainer from "../components/layout/PageContainer";

function NotFound() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <PageContainer>
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {/* Animerad 404 */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "6rem", md: "10rem" },
              fontWeight: 900,
              background: "linear-gradient(135deg, #66c0f4 0%, #57cc99 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1,
              mb: 2,
            }}
          >
            404
          </Typography>
        </motion.div>

        {/* Animerad ikon */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, -10, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeInOut",
          }}
        >
          <SportsEsportsIcon
            sx={{
              fontSize: 80,
              color: isDark ? "#2a475e" : "#c0cfe0",
              mb: 3,
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, color: theme.palette.text.primary, mb: 2 }}
          >
            Sidan hittades inte!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              mb: 4,
              maxWidth: 400,
              mx: "auto",
              lineHeight: 1.8,
            }}
          >
            Det verkar som att sidan du letar efter inte existerar eller har flyttats. Kolla URL:en eller gå tillbaka till startsidan.
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                component={Link}
                to="/"
                variant="contained"
                size="large"
                startIcon={<HomeIcon />}
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
                Tillbaka till hem
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                component={Link}
                to="/games"
                variant="outlined"
                size="large"
                startIcon={<StorefrontIcon />}
                sx={{
                  color: theme.palette.text.secondary,
                  borderColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
                  fontWeight: 700,
                  px: 4,
                  py: 1.5,
                  borderRadius: "12px",
                  "&:hover": { borderColor: "#66c0f4", color: "#66c0f4" },
                }}
              >
                Gå till butiken
              </Button>
            </motion.div>
          </Stack>
        </motion.div>
      </Box>
    </PageContainer>
  );
}

export default NotFound;