import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Games from "./pages/Games";
import GameDetail from "./pages/GameDetail";
import AddGame from "./pages/AddGame";
import EditGame from "./pages/EditGame";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/:id" element={<GameDetail />} />
        <Route path="/games/add" element={<AddGame />} />
        <Route path="/games/edit/:id" element={<EditGame />} />
      </Routes>
    </>
  );
}

export default App;