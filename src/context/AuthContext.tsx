import React, { createContext, useState, useEffect } from "react";
import api from "@/services";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/user");
        setUser(response.data);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token_conyko");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
