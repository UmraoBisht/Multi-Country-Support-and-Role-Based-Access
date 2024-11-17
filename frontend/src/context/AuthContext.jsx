import React, { createContext, useState, useContext } from "react";
import api from "../services/api";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        {
          username,
          password,
        }
      );

      const { token } = response?.data;
      setToken(token);
      setUser(response?.data?.user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(response?.data?.user));
    } catch (error) {
      throw new Error("Login failed. Please check your credentials.");
    }
  };

  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const updateUserCountry = async (newCountry) => {
    // Update user's country in backend
    const response = await api.post("/user/update", { country: newCountry });
    setUser((prevUser) => ({ ...prevUser, country: newCountry })); // Update user state in component or context
    localStorage.setItem("user", JSON.stringify(response?.data?.user));
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, updateUserCountry }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
