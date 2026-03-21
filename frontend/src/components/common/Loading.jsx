import { Box, CircularProgress, Typography } from "@mui/material";

function Loading() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 6 }}>
      <CircularProgress sx={{ color: "#66c0f4" }} />
      <Typography sx={{ mt: 2, color: "#c7d5e0" }}>Laddar...</Typography>
    </Box>
  );
}

export default Loading;