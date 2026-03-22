import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import GameForm from "../components/games/GameForm";
import gameService from "../services/gameService";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function EditGame() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    platform: "",
    status: "Planerar",
    releaseDate: "",
    image: "",
    description: "",
    rating: null,
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
          genre: game.genre || "",
          platform: game.platform || "",
          status: game.status || "Planerar",
          releaseDate: game.releaseDate ? game.releaseDate.split("T")[0] : "",
          image: game.image || "",
          description: game.description || "",
          rating: game.rating || null,
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
      console.error("Fel vid uppdatering av spel:", error);
      setError("Kunde inte uppdatera spelet.");
    }
  };

  const handleDelete = async () => {
    try {
      await gameService.deleteGame(id);
      navigate("/games");
    } catch (error) {
      console.error("Fel vid radering av spel:", error);
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
      {error && <ErrorMessage message={error} />}
      <GameForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonText="Uppdatera spel"
      />

      {/* Ta bort-knapp */}
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

      {/* Bekräftelsedialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: {
            background: "linear-gradient(180deg, #1f2f3d 0%, #16202d 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            color: "#ffffff",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 800 }}>Ta bort spel?</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#c7d5e0" }}>
            Är du säker på att du vill ta bort <strong style={{ color: "#ffffff" }}>{formData.title}</strong>? Detta går inte att ångra.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={() => setOpenDialog(false)}
            variant="outlined"
            sx={{
              color: "#c7d5e0",
              borderColor: "rgba(255,255,255,0.2)",
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