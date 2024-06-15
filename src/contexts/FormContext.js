"use client";

import React, { createContext, useContext, useState} from "react";

// Create FormContext
const FormContext = createContext();

// Dynamic button styling
const baseButtonClassName =
  "bg-gradient-to-b from-primary-start to-primary-end rounded-lg shadow-xl min-w-[100px] h-10 text-white hover:text-gray-600 px-8";
const activeButtonClassName =
  "rounded-lg shadow-xl min-w-[100px] h-10 border-2 border-teal-500 px-8";

const activeNavClassName =
  "underline underline-offset-8 text-teal-600 font-bold mr-8";

  


export const FormProvider = ({ children }) => {
  const [selectedProgram, setSelectedProgram] = useState('');
  const [activeButton, setActiveButton] = useState (baseButtonClassName);
  const [activeNav, setActiveNav] = useState(null);
  
  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <FormContext.Provider value={{
      selectedProgram,
      setSelectedProgram,
      activeButton,
      setActiveButton,
      activeNav,
      setActiveNav,
      baseButtonClassName,
      activeButtonClassName,
      activeNavClassName,
      handleButtonClick
    }}>
      {children}
    </FormContext.Provider>
  );
  
};

// Custom hook to use the FormContext
export const useFormContext = () => {
  return useContext(FormContext);
}