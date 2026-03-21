import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";

function Home() {
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
        <Box
          sx={{
            width: "100%",
            p: 5,
            borderRadius: "18px",
            background:
              "linear-gradient(135deg, rgba(102,192,244,0.12) 0%, rgba(27,40,56,0.95) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              mb: 2,
              color: "#ffffff",
            }}
          >
            Welcome to Game Library
          </Typography>

          <Typography
            variant="h6"
            sx={{
              maxWidth: "700px",
              color: "#c7d5e0",
              mb: 4,
              lineHeight: 1.6,
            }}
          >
            Samla, visa och hantera dina favoritspel i ett bibliotek med
            Steam-inspirerad design.
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              component={Link}
              to="/games"
              variant="contained"
              sx={{
                backgroundColor: "#66c0f4",
                color: "#0b1a24",
                fontWeight: 800,
                px: 3,
                "&:hover": { backgroundColor: "#8fd7ff" },
              }}
            >
              Visa spel
            </Button>

            <Button
              component={Link}
              to="/games/add"
              variant="outlined"
              sx={{
                color: "#c7d5e0",
                borderColor: "rgba(255,255,255,0.2)",
                fontWeight: 700,
                px: 3,
                "&:hover": {
                  borderColor: "#66c0f4",
                  color: "#66c0f4",
                },
              }}
            >
              Lägg till spel
            </Button>
          </Stack>
        </Box>
      </Box>
    </PageContainer>
  );
}

export default Home;