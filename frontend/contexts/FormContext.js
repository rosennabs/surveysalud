"use client";

import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import axiosInstance from "../helpers/axiosInstance";
//import { usePathname } from "next/navigation";

// Create FormContext
const FormContext = createContext();

// Dynamic button styling
const baseButtonClassName =
  "bg-gradient-to-b from-primary-start to-primary-end rounded-lg shadow-xl min-w-[100px] h-10 text-white px-8";
const activeButtonClassName =
  "rounded-lg shadow-xl min-w-[100px] h-10 border-2 border-teal-500 px-8";

const activeNavClassName =
  "underline underline-offset-8 decoration-yellow-500 decoration-4 font-bold";

  


export const FormProvider = ({ children }) => {
  const [selectedProgram, setSelectedProgram] = useState("");
  const [activeButton, setActiveButton] = useState(baseButtonClassName);
  const [activeNav, setActiveNav] = useState(null);
  const [isReportClicked, setIsReportClicked] = useState(false);
  const [isMenuExpanded, setIsMenuExpanded] = useState(true);

  //State for handling the success modal
  const [successMessage, setSuccessMessage] = useState(false);
  const { user } = useAuth();

  const toggleModal = () => {
    setSuccessMessage(!successMessage);
  };

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };



  
  // Handles all survey submissions
  const handleSubmit = async (values, actions, survey) => {

    // Determine the API URL based on the environment
    const apiUrl =
      process.env.NODE_ENV === "development"
        ? `http://localhost:8080/api/${survey}` // Development URL
        : process.env.NEXT_PUBLIC_BACKEND_URL + `/${survey}`; // Production URL

    
    try {
      if (!user) {
        throw new Error("User not found");
      }

      // Include the user's email in the values object
      const valuesWithUser = {
        ...values,
        reported_by: `${user.first_name} ${user.last_name}`,
      };

      const response = await axiosInstance.post(apiUrl, valuesWithUser);
  

      // Scroll to the top of the page
      window.scrollTo({ top: 0, behavior: "smooth" });
      toggleModal();

      actions.resetForm();
      actions.setSubmitting(false);
    } catch (error) {
      console.error("Error saving data:", error);

      // Display an error message to the user
      actions.setStatus({ error: "An error occurred while submitting data!" });
      actions.setSubmitting(false);
    }
  };


  return (
    <FormContext.Provider
      value={{
        selectedProgram,
        setSelectedProgram,
        activeButton,
        setActiveButton,
        activeNav,
        setActiveNav,
        baseButtonClassName,
        activeButtonClassName,
        activeNavClassName,
        handleButtonClick,
        handleSubmit,
        successMessage,
        setSuccessMessage,
        isReportClicked,
        setIsReportClicked,
        isMenuExpanded,
        setIsMenuExpanded,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

// Custom hook to use the FormContext
export const useFormContext = () => {
  return useContext(FormContext);
}