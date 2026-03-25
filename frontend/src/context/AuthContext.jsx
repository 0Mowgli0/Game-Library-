import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await api.get("/auth/me");
        setAuthUser(res.data.user);
      } catch (err) {
        setAuthUser(null);
      } finally {
        setAuthLoading(false);
      }
    };
    fetchMe();
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    setAuthUser(res.data.user);
    return res.data.user;
  };

  const register = async (firstName, lastName, email, password) => {
    const res = await api.post("/auth/register", { firstName, lastName, email, password });
    setAuthUser(res.data.user);
    return res.data.user;
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider value={{ authUser, authLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}