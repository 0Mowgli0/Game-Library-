import { useEffect, useState } from "react";
import { Typography, Box, MenuItem, TextField, Stack, Chip, InputAdornment, Pagination } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import PageContainer from "../components/layout/PageContainer";
import GameList from "../components/games/GameList";
import GameListSkeleton from "../components/games/GameListSkeleton";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";
import gameService from "../services/gameService";

const GAMES_PER_PAGE = 8;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Games() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [page, setPage] = useState(1);
  const query = useQuery();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  useEffect(() => {
    const sortParam = query.get("sort");
    if (sortParam) setSort(sortParam);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gamesRes, genresRes, platformsRes] = await Promise.all([
          gameService.getAllGames(),
          gameService.getAllGenres(),
          gameService.getAllPlatforms(),
        ]);
        setGames(gamesRes.data);
        setGenres(genresRes.data);
        setPlatforms(platformsRes.data);
      } catch (err) {
        setError("Kunde inte hämta spel.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Återställ sidan när filter ändras
  useEffect(() => {
    setPage(1);
  }, [search, selectedGenre, selectedPlatform, sort]);

  const filteredAndSorted = [...games]
    .filter((g) => {
      const matchSearch = g.title.toLowerCase().includes(search.toLowerCase());
      const matchGenre = selectedGenre ? g.genreId === selectedGenre : true;
      const matchPlatform = selectedPlatform ? g.platformId === selectedPlatform : true;
      return matchSearch && matchGenre && matchPlatform;
    })
    .sort((a, b) => {
      if (sort === "price") return (a.price || 0) - (b.price || 0);
      if (sort === "rating") return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  const totalPages = Math.ceil(filteredAndSorted.length / GAMES_PER_PAGE);
  const paginatedGames = filteredAndSorted.slice(
    (page - 1) * GAMES_PER_PAGE,
    page * GAMES_PER_PAGE
  );

  const selectStyles = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: isDark ? "#1f2f3d" : "#ffffff",
      color: theme.palette.text.primary,
      borderRadius: "10px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
    },
    "& .MuiSvgIcon-root": { color: theme.palette.text.secondary },
    "& .MuiInputLabel-root": { color: theme.palette.text.secondary },
  };

  const hasFilters = search || selectedGenre || selectedPlatform;

  return (
    <Box>
      {/* Hero-sektion */}
      <Box
        sx={{
          background: isDark
            ? "linear-gradient(135deg, #0f1923 0%, #1b2838 50%, #2a475e 100%)"
            : "linear-gradient(135deg, #e0eaf5 0%, #c8daf0 50%, #b0cce8 100%)",
          borderBottom: isDark
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid rgba(0,0,0,0.06)",
          py: 6,
          px: { xs: 3, md: 8 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box sx={{
          position: "absolute", top: -100, right: -100,
          width: 400, height: 400, borderRadius: "50%",
          background: isDark ? "rgba(102,192,244,0.05)" : "rgba(102,192,244,0.1)",
          pointerEvents: "none",
        }} />
        <Box sx={{
          position: "absolute", bottom: -50, left: -50,
          width: 200, height: 200, borderRadius: "50%",
          background: isDark ? "rgba(87,204,153,0.05)" : "rgba(87,204,153,0.1)",
          pointerEvents: "none",
        }} />

        <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="center" spacing={4}>
          <Box>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <WhatshotIcon sx={{ color: "#f4a261", fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: "#f4a261", fontWeight: 700, letterSpacing: 1 }}>
                SENASTE SPELEN
              </Typography>
            </Stack>
            <Typography variant="h3" sx={{ fontWeight: 900, color: theme.palette.text.primary, mb: 1 }}>
              Utforska vår butik
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary, maxWidth: 500 }}>
              Hitta ditt nästa favoritspel bland hundratals titlar för alla plattformar och genres.
            </Typography>
          </Box>

          <Stack direction="row" spacing={3} sx={{ textAlign: "center" }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 900, color: "#66c0f4" }}>{games.length}</Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>Spel</Typography>
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 900, color: "#57cc99" }}>{genres.length}</Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>Genres</Typography>
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 900, color: "#f4a261" }}>{platforms.length}</Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>Plattformar</Typography>
            </Box>
          </Stack>
        </Stack>
      </Box>

      <PageContainer>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: theme.palette.text.primary }}>
            Alla spel
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            {filteredAndSorted.length} spel — sida {page} av {totalPages || 1}
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ mb: 3, color: theme.palette.text.secondary }}>
          Bläddra bland våra spel och lägg till i varukorgen
        </Typography>

        {/* Sök och filter */}
        <Box
          sx={{
            p: 3, mb: 4, borderRadius: "16px",
            background: isDark
              ? "linear-gradient(180deg, #1f2f3d 0%, #16202d 100%)"
              : "linear-gradient(180deg, #ffffff 0%, #f0f4f8 100%)",
            border: isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)",
          }}
        >
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              fullWidth
              placeholder="Sök spel..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: theme.palette.text.secondary }} />
                  </InputAdornment>
                ),
              }}
              sx={{ ...selectStyles, flex: 2 }}
            />
            <TextField select label="Genre" value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} sx={{ ...selectStyles, minWidth: 150 }}>
              <MenuItem value="">Alla genres</MenuItem>
              {genres.map((g) => <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>)}
            </TextField>
            <TextField select label="Plattform" value={selectedPlatform} onChange={(e) => setSelectedPlatform(e.target.value)} sx={{ ...selectStyles, minWidth: 150 }}>
              <MenuItem value="">Alla plattformar</MenuItem>
              {platforms.map((p) => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
            </TextField>
            <TextField select label="Sortera" value={sort} onChange={(e) => setSort(e.target.value)} sx={{ ...selectStyles, minWidth: 160 }}>
              <MenuItem value="">Standard</MenuItem>
              <MenuItem value="price">Lägsta pris</MenuItem>
              <MenuItem value="rating">Högst betyg</MenuItem>
            </TextField>
          </Stack>

          {hasFilters && (
            <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
              {search && (
                <Chip label={`Sökning: "${search}"`} onDelete={() => setSearch("")} size="small"
                  sx={{ backgroundColor: isDark ? "#2a475e" : "#e0eaf5", color: theme.palette.text.primary }} />
              )}
              {selectedGenre && (
                <Chip label={`Genre: ${genres.find((g) => g.id === selectedGenre)?.name}`} onDelete={() => setSelectedGenre("")} size="small"
                  sx={{ backgroundColor: "#66c0f4", color: "#0b1a24", fontWeight: 700 }} />
              )}
              {selectedPlatform && (
                <Chip label={`Plattform: ${platforms.find((p) => p.id === selectedPlatform)?.name}`} onDelete={() => setSelectedPlatform("")} size="small"
                  sx={{ backgroundColor: isDark ? "#2a475e" : "#e0eaf5", color: theme.palette.text.primary }} />
              )}
            </Stack>
          )}
        </Box>

        {loading && <GameListSkeleton />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && filteredAndSorted.length === 0 && (
          <EmptyState message="Inga spel matchade din sökning." />
        )}
        {!loading && !error && paginatedGames.length > 0 && (
          <>
            <GameList games={paginatedGames} />

            {/* Paginering */}
            {totalPages > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_, val) => {
                    setPage(val);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  sx={{
                    "& .MuiPaginationItem-root": {
                      color: theme.palette.text.secondary,
                      border: isDark
                        ? "1px solid rgba(255,255,255,0.1)"
                        : "1px solid rgba(0,0,0,0.1)",
                      borderRadius: "8px",
                    },
                    "& .MuiPaginationItem-root.Mui-selected": {
                      backgroundColor: "#66c0f4",
                      color: "#0b1a24",
                      fontWeight: 800,
                      border: "none",
                    },
                    "& .MuiPaginationItem-root:hover": {
                      backgroundColor: "rgba(102,192,244,0.15)",
                      color: "#66c0f4",
                    },
                  }}
                />
              </Box>
            )}
          </>
        )}
      </PageContainer>
    </Box>
  );
}

export default Games;