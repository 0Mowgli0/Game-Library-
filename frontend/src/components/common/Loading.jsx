import { Box, Typography } from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 10,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: 80,
          height: 80,
          mb: 3,
        }}
      >
        {/* Yttre ring */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "3px solid rgba(102,192,244,0.15)",
          }}
        />
        {/* Animerad ring */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "3px solid transparent",
            borderTopColor: "#66c0f4",
            borderRightColor: "#66c0f4",
            animation: "spin 1s linear infinite",
            "@keyframes spin": {
              "0%": { transform: "rotate(0deg)" },
              "100%": { transform: "rotate(360deg)" },
            },
          }}
        />
        {/* Inre ring */}
        <Box
          sx={{
            position: "absolute",
            inset: 10,
            borderRadius: "50%",
            border: "3px solid transparent",
            borderTopColor: "#57cc99",
            animation: "spinReverse 0.8s linear infinite",
            "@keyframes spinReverse": {
              "0%": { transform: "rotate(0deg)" },
              "100%": { transform: "rotate(-360deg)" },
            },
          }}
        />
        {/* Ikon i mitten */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SportsEsportsIcon sx={{ fontSize: 28, color: "#66c0f4" }} />
        </Box>
      </Box>

      <Typography
        variant="h6"
        sx={{
          color: "#c7d5e0",
          fontWeight: 700,
          letterSpacing: 2,
          animation: "pulse 1.5s ease-in-out infinite",
          "@keyframes pulse": {
            "0%, 100%": { opacity: 1 },
            "50%": { opacity: 0.4 },
          },
        }}
      >
        LADDAR...
      </Typography>
    </Box>
  );
}

export default Loading;