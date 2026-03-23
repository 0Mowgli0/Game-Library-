// main.jsx
import { StrictMode, useRef } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "./context/SnackbarContext";
import { CartProvider, useCart } from "./context/CartContext";
import { ThemeProviderWrapper } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";
import "./index.css";
import App from "./App.jsx";

function AppWithProviders() {
  const { updateUser } = useCart();

  return (
    <UserProvider onUserChange={updateUser}>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </UserProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProviderWrapper>
        <CartProvider>
          <AppWithProviders />
        </CartProvider>
      </ThemeProviderWrapper>
    </BrowserRouter>
  </StrictMode>
);