"use client";

import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import { useFormContext } from "../contexts/FormContext";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { AboutDropDown } from "./DropDown";
import ProfileDropDown from "./Profile";
import { FaRegUserCircle } from "react-icons/fa";


export default function Header() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();
  const {
    activeNavClassName,
    activeNav,
    setActiveNav,
  } = useFormContext();

  const [dropdownMenu, setDropdownMenu] = useState(false);
  const dropdownRef = useRef(null);

  const handleNavClick = (nav: string) => {
    setActiveNav(nav);
    nav === "about" || nav === "profile" ? setDropdownMenu(true) : setDropdownMenu(false);

    if (nav === "resources") {
      router.push("/?scrollTo=resource-hub"); //Navigate to homepage with the provided query parameter
    }
  };


  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      //checks if the dropdown element exists and if the clicked element is outside the dropdown.
      setDropdownMenu(false);
      setActiveNav(null);
    }
  };

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
    <header className="flex items-center justify-between text-m lg:flex pb-4 mx-24">
      <Link href="/">
        <div onClick={() => setActiveNav(null)}>
          <img src="/logo.png" alt="logo" className="w-[120px]" />
        </div>
      </Link>

      <div className="flex items-center w-90">
        <div className=" flex relative group" ref={dropdownRef}>
          <div
            onClick={() => handleNavClick("about")}
            className={`flex items-center cursor-pointer ${
              activeNav === "about"
                ? activeNavClassName
                : "hover:underline hover:underline-offset-8 hover:text-teal-600 mr-8"
            }`}
          >
            About
            <MdOutlineKeyboardArrowDown className="ml-2" />
          </div>
          {activeNav === "about" && dropdownMenu && <AboutDropDown />}
        </div>

        <Link href="/dashboard">
          <div
            onClick={() => handleNavClick("dashboard")}
            className={
              activeNav === "dashboard"
                ? activeNavClassName
                : "hover:underline hover:underline-offset-8 hover:text-teal-600 mr-8"
            }
          >
            Dashboard
          </div>
        </Link>

        <Link href={isAuthenticated ? "/reporting" : "/login"}>
          <div
            onClick={() => handleNavClick("reporting")}
            className={
              activeNav === "reporting"
                ? activeNavClassName
                : "hover:underline hover:underline-offset-8 hover:text-teal-600 mr-8"
            }
          >
            Reporting
          </div>
        </Link>

        <div
          onClick={() => handleNavClick("resources")}
          className={
            activeNav === "resources"
              ? activeNavClassName
              : "hover:underline hover:underline-offset-8 hover:text-teal-600 cursor-pointer"
          }
        >
          Resources
        </div>
      </div>

      <div className="flex items-center space-x-8">
        {isAuthenticated && (
          <>
            <p>Hello, {user.first_name}</p>

            <div className=" flex relative group" ref={dropdownRef}>
            <div onClick={() => handleNavClick("profile")}
              className={`flex items-center cursor-pointer ${activeNav === "profile"
                  ? activeNavClassName
                  : "hover:underline hover:underline-offset-8 hover:text-teal-600 mr-8"
                }`} >
              
                <FaRegUserCircle className="text-2xl mr-2" />
              <MdOutlineKeyboardArrowDown />
            </div>
              {activeNav === "profile" && dropdownMenu && <ProfileDropDown />}
            </div>

          </>
        )}
      </div>
    </header>
  );
}
