'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';


//Create AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
 

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user.token) {
      setIsAuthenticated(true);
    } 
  }, []);
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

//Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};