import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, logoutUser } from "../services/authService";
import { getProfile } from "../services/userService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setIsLoading(false);
      return;
    }

    getProfile()
      .then((data) => setUser(data))
      .catch(() => {

        localStorage.removeItem("access_token");
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  async function login(email, password) {
    await loginUser(email, password);
    const profile = await getProfile();
    setUser(profile);
  }

  function logout() {
    logoutUser();
    setUser(null);
  }

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("ERROR");
  }
  return context;
}
