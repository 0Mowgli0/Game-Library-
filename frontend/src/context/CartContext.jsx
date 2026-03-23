// CartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import gameService from "../services/gameService";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [currentUserId, setCurrentUserId] = useState(null);

  const fetchCartCount = async (userId) => {
    const id = userId || currentUserId;
    if (!id) return;
    try {
      const res = await gameService.getCart(id);
      const count = res.data.games?.reduce((acc, g) => acc + g.amount, 0) || 0;
      setCartCount(count);
    } catch (err) {
      console.error("Kunde inte hämta varukorg", err);
    }
  };

  const updateUser = (userId) => {
    setCurrentUserId(userId);
    fetchCartCount(userId);
  };

  return (
    <CartContext.Provider value={{ cartCount, fetchCartCount, updateUser }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}