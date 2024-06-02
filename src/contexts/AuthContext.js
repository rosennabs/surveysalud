'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';


//Create AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
 

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = sessionStorage.getItem("token");
    
    if (user && token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

    const logout = () => {
      sessionStorage.clear();
      setIsAuthenticated(false);
    };
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

//Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};