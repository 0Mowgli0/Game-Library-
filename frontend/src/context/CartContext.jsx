import { createContext, useContext, useState, useEffect } from "react";
import gameService from "../services/gameService";

const CartContext = createContext();

export function CartProvider({ children, userId }) {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async (id) => {
    const resolvedId = id || userId;
    if (!resolvedId) {
      setCartCount(0);
      return;
    }
    try {
      const res = await gameService.getCart(resolvedId);
      const count = res.data.games?.reduce((acc, g) => acc + g.amount, 0) || 0;
      setCartCount(count);
    } catch (err) {
      console.error("Kunde inte hämta varukorg", err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchCartCount(userId);
    } else {
      setCartCount(0);
    }
  }, [userId]);

  return (
    <CartContext.Provider value={{ cartCount, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}