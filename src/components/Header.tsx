"use client";

import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import { useFormContext } from "../contexts/FormContext";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import DropDown from "./DropDown";


export default function Header() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();
  const {
    baseButtonClassName,
    activeButtonClassName,
    activeNavClassName,
    activeNav,
    setActiveNav,
    activeButton,
    setActiveButton,
    handleButtonClick,
  } = useFormContext();

  const [dropdownMenu, setDropdownMenu] = useState(false);
  const dropdownRef = useRef(null);

  const handleNavClick = (nav: string) => {
    setActiveNav(nav);
    nav === "about" ? setDropdownMenu(!dropdownMenu) : setDropdownMenu(false);

    if (nav === "resources") {
      router.push('/?scrollTo=resource-hub'); //Navigate to homepage with the provided query parameter
    }
  };

  const handleLogout = (button: string) => {
    setActiveButton(button);
    logout();
    router.push("/login");
    setActiveButton(baseButtonClassName);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) { //checks if the dropdown element exists and if the clicked element is outside the dropdown.
      setDropdownMenu(false);
      setActiveNav(null);
    }
  }

  useEffect(() => {
    if (dropdownMenu) {
      // Add the event listener when the dropdown menu is visible
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Remove the event listener when the dropdown menu is hidden
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownMenu]);

  

  return (
    <header className="z-10 flex items-center justify-between text-m lg:flex pb-4 mx-32">
      <Link href="/">
        <div onClick={() => setActiveNav(null)}>
          <img src="/logo.png" alt="logo" className="w-[120px]"/>
        </div>
      </Link>

      <div className="flex items-center w-90">
        
        <div className=" flex relative group" ref={dropdownRef}>
         
            <div
              onClick={() => handleNavClick("about")}
              className={`flex items-center cursor-pointer ${activeNav === "about" ? activeNavClassName : "mr-8"}`}
            >
              About
              <MdOutlineKeyboardArrowDown />
            </div>
            {dropdownMenu && <DropDown />}
          
        </div>

       

        <Link href="/dashboard">
          <div
            onClick={() => handleNavClick("dashboard")}
            className={activeNav === "dashboard" ? activeNavClassName : "mr-8"}
          >
            Dashboard
          </div>
        </Link>

        <Link href="/login">
          <div
            onClick={() => handleNavClick("reporting")}
            className={activeNav === "reporting" ? activeNavClassName : "mr-8"}
          >
            Reporting
          </div>
        </Link>

       
          <div
            onClick={() => handleNavClick("resources")}
            className={activeNav === "resources" ? activeNavClassName : "mr-8 cursor-pointer"}
          >
            Resources
          </div>
        


        <Link href='/program'>
          <div onClick={() => handleNavClick('program')} className={activeNav === 'program' ? activeNavClassName : 'mr-8'}>
                  Program
                </div>
              </Link>

        {/* <Link href='/knowledge_products'>
          <div onClick={() => handleNavClick('kp')} className={activeNav === 'kp' ? activeNavClassName : 'mr-8'}>
                  Knowledge Products
                </div>
              </Link> */}

        {/* <Link href='/relationships'>
          <div onClick={() => handleNavClick('relationship')} className={activeNav === 'relationship' ? activeNavClassName : 'mr-8'}>
                  Relationship building
                </div>
              </Link> */}
      </div>

      <Link href="/feedback">
        <button
          onClick={() => handleButtonClick("feedback")}
          className={
            activeButton === "feedback"
              ? activeButtonClassName
              : baseButtonClassName
          }
        >
          Leave Feedback
        </button>
      </Link>

      {/* <div className="flex items-center space-x-8">
        
        {isAuthenticated ? (
          <>
            <p className="text-m text-black">Hello, {user.first_name}</p>

            <button onClick={() => handleLogout('logout')} className={activeButton === 'logout' ? activeButtonClassName : baseButtonClassName}>
                Logout
              </button>
            
          </>
        ) : (
          <>
              <Link href='/login'>
                <button onClick={() => handleButtonClick('login')} className={activeButton === 'login' ? activeButtonClassName : baseButtonClassName}>
                  Login
                </button>
              </Link>

              <Link href='/registration'>
              <button onClick={() => handleButtonClick('signup')} className={activeButton === 'signup' ? activeButtonClassName : baseButtonClassName}>
                  Sign up
                </button>
            </Link>
            </>
        )}
            </div> */}
    </header>
  );
}
