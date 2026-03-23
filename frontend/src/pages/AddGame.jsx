// AddGame.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import GameForm from "../components/games/GameForm";
import Breadcrumbs from "../components/common/Breadcrumbs";
import gameService from "../services/gameService";

function AddGame() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    genreId: "",
    platformId: "",
    releaseDate: "",
    image: "",
    description: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await gameService.createGame(formData);
      navigate("/games");
    } catch (error) {
      console.error("Fel vid skapande av spel:", error);
    }
  };

  return (
    <PageContainer>
      <Breadcrumbs
        crumbs={[
          { label: "Hem", to: "/" },
          { label: "Butik", to: "/games" },
          { label: "Lägg till spel" },
        ]}
      />
      <GameForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonText="Lägg till spel"
      />
    </PageContainer>
  );
}

export default AddGame;