"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Create FormContext
const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [selectedProgram, setSelectedProgram] = useState('');

  return (
    <FormContext.Provider value={{ selectedProgram, setSelectedProgram }}>
      {children}
    </FormContext.Provider>
  );
  
};

// Custom hook to use the FormContext
export const useFormContext = () => {
  return useContext(FormContext);
}