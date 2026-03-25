import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "./context/SnackbarContext";
import { CartProvider } from "./context/CartContext";
import { ThemeProviderWrapper } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./index.css";
import App from "./App.jsx";

function AppWithProviders() {
  const { authUser } = useAuth();

  return (
    <CartProvider userId={authUser?.id}>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </CartProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProviderWrapper>
        <AuthProvider>
          <AppWithProviders />
        </AuthProvider>
      </ThemeProviderWrapper>
    </BrowserRouter>
  </StrictMode>
);