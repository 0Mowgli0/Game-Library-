import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import GameForm from "../components/games/GameForm";
import gameService from "../services/gameService";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";

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
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    </PageContainer>
  );
}

export default EditGame;