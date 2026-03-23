import { Box, Typography, Button } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Link } from "react-router-dom";

function PromoBanner() {
  return (
    <Box
      sx={{
        background: "linear-gradient(90deg, #1a4a2e 0%, #1f6b3e 50%, #1a4a2e 100%)",
        borderBottom: "1px solid rgba(87,204,153,0.3)",
        py: 1,
        px: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animerad bakgrund */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg, transparent 0%, rgba(87,204,153,0.1) 50%, transparent 100%)",
          animation: "shimmer 3s infinite",
          "@keyframes shimmer": {
            "0%": { transform: "translateX(-100%)" },
            "100%": { transform: "translateX(100%)" },
          },
        }}
      />

      <LocalOfferIcon sx={{ color: "#57cc99", fontSize: 18 }} />
      <Typography
        variant="body2"
        sx={{ color: "#ffffff", fontWeight: 700, letterSpacing: 0.5 }}
      >
        🎮 ERBJUDANDE — Fri frakt på alla beställningar över 299 kr!
      </Typography>
      <Button
        component={Link}
        to="/games"
        size="small"
        sx={{
          color: "#57cc99",
          fontWeight: 800,
          fontSize: "0.75rem",
          border: "1px solid rgba(87,204,153,0.5)",
          borderRadius: "6px",
          px: 1.5,
          py: 0.3,
          minWidth: "auto",
          "&:hover": {
            backgroundColor: "rgba(87,204,153,0.15)",
          },
        }}
      >
        Shoppa nu
      </Button>
    </Box>
  );
}

export default PromoBanner;