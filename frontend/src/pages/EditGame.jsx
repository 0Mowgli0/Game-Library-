// EditGame.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PageContainer from "../components/layout/PageContainer";
import GameForm from "../components/games/GameForm";
import Breadcrumbs from "../components/common/Breadcrumbs";
import gameService from "../services/gameService";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";

function EditGame() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [formData, setFormData] = useState({
    title: "",
    genreId: "",
    platformId: "",
    releaseDate: "",
    image: "",
    description: "",
    price: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await gameService.getGameById(id);
        const game = response.data;

        setFormData({
          title: game.title || "",
          genreId: game.genreId || "",
          platformId: game.platformId || "",
          releaseDate: game.releaseDate ? game.releaseDate.split("T")[0] : "",
          image: game.image || "",
          description: game.description || "",
          price: game.price || "",
        });
      } catch (err) {
        setError("Kunde inte hämta spelet.");
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await gameService.updateGame(id, formData);
      navigate(`/games/${id}`);
    } catch (error) {
      setError("Kunde inte uppdatera spelet.");
    }
  };

  const handleDelete = async () => {
    try {
      await gameService.deleteGame(id);
      navigate("/games");
    } catch (error) {
      setError("Kunde inte radera spelet.");
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <Loading />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Breadcrumbs
        crumbs={[
          { label: "Hem", to: "/" },
          { label: "Butik", to: "/games" },
          { label: formData.title, to: `/games/${id}` },
          { label: "Redigera" },
        ]}
      />

      {error && <ErrorMessage message={error} />}
      <GameForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonText="Uppdatera spel"
      />

      <Button
        fullWidth
        variant="outlined"
        startIcon={<DeleteIcon />}
        onClick={() => setOpenDialog(true)}
        sx={{
          mt: 2,
          py: 1.5,
          color: "#ff6b6b",
          borderColor: "rgba(255,107,107,0.4)",
          fontWeight: 800,
          borderRadius: "10px",
          "&:hover": {
            borderColor: "#ff6b6b",
            backgroundColor: "rgba(255,107,107,0.08)",
          },
        }}
      >
        Ta bort spel
      </Button>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: {
            background: isDark
              ? "linear-gradient(180deg, #1f2f3d 0%, #16202d 100%)"
              : "linear-gradient(180deg, #ffffff 0%, #f0f4f8 100%)",
            border: isDark
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid rgba(0,0,0,0.08)",
            borderRadius: "16px",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, color: theme.palette.text.primary }}>
          Ta bort spel?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: theme.palette.text.secondary }}>
            Är du säker på att du vill ta bort{" "}
            <strong style={{ color: theme.palette.text.primary }}>{formData.title}</strong>?
            Detta går inte att ångra.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={() => setOpenDialog(false)}
            variant="outlined"
            sx={{
              color: theme.palette.text.secondary,
              borderColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
              "&:hover": { borderColor: "#66c0f4", color: "#66c0f4" },
            }}
          >
            Avbryt
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            sx={{
              backgroundColor: "#ff6b6b",
              color: "#ffffff",
              fontWeight: 800,
              "&:hover": { backgroundColor: "#ff4444" },
            }}
          >
            Ta bort
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
}

export default EditGame;