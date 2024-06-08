'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';


//Create AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    const token = sessionStorage.getItem("token");

    if (storedUser && token) {
      setUser(storedUser);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
    setLoading(false); // Set loading to false after initialization
  }, []);

  const login = (user, token) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("token", token);
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.clear();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

//Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};