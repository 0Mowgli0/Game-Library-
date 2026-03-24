import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import PromoBanner from "./components/common/PromoBanner";
import Home from "./pages/Home";
import Games from "./pages/Games";
import GameDetail from "./pages/GameDetail";
import AddGame from "./pages/AddGame";
import EditGame from "./pages/EditGame";
import CartPage from "./pages/CartPage";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrdersPage from "./pages/OrdersPage";
import SalePage from "./pages/SalePage";
import ReviewsPage from "./pages/ReviewsPage";
import InfoPage from "./pages/InfoPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <PromoBanner />
      <Navbar />
      <Box sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/:id" element={<GameDetail />} />
          <Route path="/games/add" element={<AddGame />} />
          <Route path="/games/edit/:id" element={<EditGame />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/sale" element={<SalePage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;