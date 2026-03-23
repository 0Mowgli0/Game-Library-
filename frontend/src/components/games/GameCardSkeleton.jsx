import { Card, CardContent, Skeleton, Stack, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function GameCardSkeleton() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: isDark
          ? "linear-gradient(180deg, #1f2f3d 0%, #16202d 100%)"
          : "linear-gradient(180deg, #ffffff 0%, #f0f4f8 100%)",
        borderRadius: "14px",
        overflow: "hidden",
        border: isDark
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid rgba(0,0,0,0.08)",
      }}
    >
      {/* Bild skeleton */}
      <Skeleton
        variant="rectangular"
        height={200}
        sx={{
          backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
        }}
      />

      <CardContent sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Titel */}
        <Skeleton
          variant="text"
          width="70%"
          height={32}
          sx={{
            mb: 1,
            backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
          }}
        />

        {/* Chips */}
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Skeleton
            variant="rounded"
            width={60}
            height={24}
            sx={{ backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}
          />
          <Skeleton
            variant="rounded"
            width={80}
            height={24}
            sx={{ backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}
          />
        </Stack>

        {/* Beskrivning */}
        <Skeleton
          variant="text"
          width="100%"
          sx={{ backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}
        />
        <Skeleton
          variant="text"
          width="80%"
          sx={{ mb: 2, backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}
        />

        <Box sx={{ mt: "auto" }}>
          {/* Pris */}
          <Skeleton
            variant="text"
            width="40%"
            height={40}
            sx={{ mb: 2, backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}
          />

          {/* Knappar */}
          <Stack direction="row" spacing={1}>
            <Skeleton
              variant="rounded"
              height={36}
              sx={{
                flex: 1,
                backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
              }}
            />
            <Skeleton
              variant="rounded"
              width={60}
              height={36}
              sx={{ backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}
            />
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

export default GameCardSkeleton;