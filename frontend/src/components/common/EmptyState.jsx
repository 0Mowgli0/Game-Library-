import { Box, Typography } from "@mui/material";

function EmptyState({ message = "Inget innehåll hittades." }) {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 8,
        backgroundColor: "rgba(255,255,255,0.04)",
        borderRadius: "14px",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Typography variant="h6" sx={{ color: "#c7d5e0" }}>
        {message}
      </Typography>
    </Box>
  );
}

export default EmptyState;