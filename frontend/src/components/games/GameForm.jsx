import { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  InputAdornment,
  useTheme,
  Switch,
  FormControlLabel,
  Divider,
  Stack,
  Chip,
} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import gameService from "../../services/gameService";

function GameForm({ formData, handleChange, handleSubmit, buttonText }) {
  const [platforms, setPlatforms] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [platformRes, genreRes] = await Promise.all([
          gameService.getAllPlatforms(),
          gameService.getAllGenres(),
        ]);
        setPlatforms(platformRes.data);
        setGenres(genreRes.data);
      } catch (err) {
        console.error("Kunde inte hämta plattformar/genres", err);
      } finally {
        setLoadingOptions(false);
      }
    };
    fetchOptions();
  }, []);

  if (loadingOptions) return null;

  const salePrice = formData.onSale && formData.price && formData.salePercentage
    ? Math.round(formData.price * (1 - formData.salePercentage / 100))
    : null;

  const textFieldStyles = {
    mb: 2,
    "& .MuiOutlinedInput-root": {
      backgroundColor: isDark ? "#2a475e" : "#ffffff",
      color: theme.palette.text.primary,
      borderRadius: "10px",
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.text.secondary,
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#66c0f4",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
    },
    "& .MuiSvgIcon-root": {
      color: theme.palette.text.secondary,
    },
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 4,
        background: isDark
          ? "linear-gradient(180deg, #1f2f3d 0%, #16202d 100%)"
          : "linear-gradient(180deg, #ffffff 0%, #f0f4f8 100%)",
        borderRadius: "16px",
        border: isDark
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid rgba(0,0,0,0.08)",
        boxShadow: isDark
          ? "0 12px 28px rgba(0,0,0,0.25)"
          : "0 12px 28px rgba(0,0,0,0.08)",
      }}
    >
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 800, color: theme.palette.text.primary }}>
        {buttonText === "Lägg till spel" ? "Lägg till spel" : "Redigera spel"}
      </Typography>

      <TextField
        fullWidth
        label="Titel"
        name="title"
        value={formData.title}
        onChange={handleChange}
        sx={textFieldStyles}
      />

      <TextField
        fullWidth
        select
        label="Genre"
        name="genreId"
        value={formData.genreId || ""}
        onChange={handleChange}
        sx={textFieldStyles}
      >
        <MenuItem value="">Välj genre</MenuItem>
        {genres.map((g) => (
          <MenuItem key={g.id} value={g.id}>
            {g.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        select
        label="Plattform"
        name="platformId"
        value={formData.platformId || ""}
        onChange={handleChange}
        sx={textFieldStyles}
      >
        <MenuItem value="">Välj plattform</MenuItem>
        {platforms.map((p) => (
          <MenuItem key={p.id} value={p.id}>
            {p.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        label="Ordinarie pris"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">kr</InputAdornment>,
        }}
        sx={textFieldStyles}
      />

      {/* REA-sektion */}
      <Divider sx={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)", mb: 2 }} />

      <Box
        sx={{
          p: 3,
          mb: 2,
          borderRadius: "12px",
          background: formData.onSale
            ? isDark ? "rgba(87,204,153,0.08)" : "rgba(87,204,153,0.05)"
            : isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
          border: formData.onSale
            ? "1px solid rgba(87,204,153,0.3)"
            : isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
          transition: "all 0.3s ease",
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: formData.onSale ? 2 : 0 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <LocalOfferIcon sx={{ color: formData.onSale ? "#57cc99" : theme.palette.text.secondary, fontSize: 20 }} />
            <Typography sx={{ fontWeight: 700, color: formData.onSale ? "#57cc99" : theme.palette.text.secondary }}>
              Rea-pris
            </Typography>
            {formData.onSale && (
              <Chip
                label="AKTIV"
                size="small"
                sx={{ backgroundColor: "rgba(87,204,153,0.2)", color: "#57cc99", fontWeight: 700, fontSize: "0.7rem" }}
              />
            )}
          </Stack>
          <FormControlLabel
            control={
              <Switch
                checked={!!formData.onSale}
                onChange={(e) => handleChange({ target: { name: "onSale", value: e.target.checked } })}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": { color: "#57cc99" },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: "#57cc99" },
                }}
              />
            }
            label=""
          />
        </Stack>

        {formData.onSale && (
          <Box>
            <TextField
              fullWidth
              label="Rabatt (%)"
              name="salePercentage"
              type="number"
              value={formData.salePercentage || ""}
              onChange={handleChange}
              inputProps={{ min: 1, max: 99 }}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              sx={textFieldStyles}
            />

            {salePrice && (
              <Box
                sx={{
                  p: 2,
                  borderRadius: "10px",
                  background: isDark ? "rgba(87,204,153,0.1)" : "rgba(87,204,153,0.08)",
                  border: "1px solid rgba(87,204,153,0.2)",
                }}
              >
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 0.5 }}>
                  Förhandsvisning:
                </Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography
                    variant="body1"
                    sx={{ color: theme.palette.text.secondary, textDecoration: "line-through" }}
                  >
                    {formData.price} kr
                  </Typography>
                  <Chip
                    label={`-${formData.salePercentage}%`}
                    size="small"
                    sx={{ backgroundColor: "#57cc99", color: "#0b1a24", fontWeight: 800 }}
                  />
                  <Typography variant="h6" sx={{ color: "#57cc99", fontWeight: 900 }}>
                    {salePrice} kr
                  </Typography>
                </Stack>
              </Box>
            )}
          </Box>
        )}
      </Box>

      <Divider sx={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)", mb: 2 }} />

      <TextField
        fullWidth
        label="Releasedatum"
        name="releaseDate"
        type="date"
        value={formData.releaseDate}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        sx={textFieldStyles}
      />

      <TextField
        fullWidth
        label="Bild-URL"
        name="image"
        value={formData.image}
        onChange={handleChange}
        sx={textFieldStyles}
      />

      <TextField
        fullWidth
        label="Beskrivning"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={5}
        sx={textFieldStyles}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 1,
          py: 1.5,
          backgroundColor: "#66c0f4",
          color: "#0b1a24",
          fontWeight: 800,
          borderRadius: "10px",
          "&:hover": {
            backgroundColor: "#8fd7ff",
          },
        }}
      >
        {buttonText}
      </Button>
    </Box>
  );
}

export default GameForm;