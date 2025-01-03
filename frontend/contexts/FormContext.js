"use client";

import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import axiosInstance from "../helpers/axiosInstance";
//import { usePathname } from "next/navigation";

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
  const [selectedProgram, setSelectedProgram] = useState("");
  const [activeButton, setActiveButton] = useState(baseButtonClassName);
  const [activeNav, setActiveNav] = useState(null);
  //State for handling the success modal
  const [successMessage, setSuccessMessage] = useState(false);
  const { user } = useAuth();
  

  // const toggleModal = (): void => {
  //   setSuccessMessage(!successMessage);
  // };
  const toggleModal = () => {
    setSuccessMessage(!successMessage);
  };

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  // Handles all survey submissions
 const handleSubmit = async (values, actions, survey) => {
   try {
     if (!user) {
       throw new Error("User not found");
     }

     // Include the user's email in the values object
     const valuesWithUser = {
       ...values,
       reported_by: `${user.first_name} ${user.last_name}`,
     };

     const response = await axiosInstance.post(
       `http://localhost:8080/api/${survey}`,
       valuesWithUser
     );
     //console.log(`${survey} saved to db: `, response.data);
     
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

  //const pathname = usePathname();
  //const isDashboard = pathname === "/dashboard";

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
        setSuccessMessage
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