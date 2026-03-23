import { createContext, useContext, useState, useEffect } from "react";
import gameService from "../services/gameService";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await gameService.getAllUsers();
        setUsers(res.data);
        setCurrentUser(res.data[0]);
      } catch (err) {
        console.error("Kunde inte hämta användare", err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}