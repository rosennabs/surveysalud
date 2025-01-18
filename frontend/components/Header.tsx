"use client";

import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import { useFormContext } from "../contexts/FormContext";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import ProfileDropDown from "./Profile";
import { FaRegUserCircle } from "react-icons/fa";

const navOnHover = "hover:underline hover:underline-offset-8 decoration-yellow-500 decoration-4 cursor-pointer"

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
    nav === "profile" && setDropdownMenu(true);

    if (nav === "resources") {
      router.push("/?scrollTo=resource-hub"); //Navigate to homepage with the provided query parameter
    }
  };
  const toggleDropdown = () => {
    setDropdownMenu(!dropdownMenu); // Toggle dropdown visibility
    setActiveNav((prev) => (prev === "profile" ? null : "profile")); // Toggle activeNav
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
    <header className="flex items-center justify-between text-m lg:flex pb-4 px-16">
      <Link href="/">
        <div onClick={() => setActiveNav(null)}>
          <img src="/logo.png" alt="logo" className="w-[120px]" />
        </div>
      </Link>

      <div className="flex items-center w-90">

        <div className="flex gap-8">
          <Link href="/about_us">
            <div
              onClick={() => handleNavClick("about_us")} className={
                activeNav === "about_us"
                  ? activeNavClassName
                  : navOnHover
              }>
              About Us
            </div>
          </Link>

          <Link href="/dashboard">
            <div
              onClick={() => handleNavClick("dashboard")}
              className={
                activeNav === "dashboard"
                  ? activeNavClassName
                  : navOnHover
              }
            >
              Dashboard
            </div>
          </Link>

          <Link href={isAuthenticated ? "/surveys" : "/login"}>
            <div
              onClick={() => handleNavClick("surveys")}
              className={
                activeNav === "surveys"
                  ? activeNavClassName
                  : navOnHover
              }
            >
              Surveys
            </div>
          </Link>

          <Link href="/resources">
            <div
              onClick={() => handleNavClick("resources")}
              className={
                activeNav === "resources"
                  ? activeNavClassName
                  : navOnHover
              }
            >
              Resources
            </div>
          </Link>
          
        </div>
        </div>
        

      <div className="flex items-center space-x-8">
        {isAuthenticated && (
          <>
            <p>Hello, {user.first_name}</p>

            <div className="flex relative group" ref={dropdownRef}>
              <div onClick={() => toggleDropdown()}
                className={`flex items-center cursor-pointer ${dropdownMenu
                  ? "text-yellow-600" : ""
                  }`}
                >

                <FaRegUserCircle className="text-2xl mr-2" />
                <MdOutlineKeyboardArrowDown />
              </div>    
                {dropdownMenu && <ProfileDropDown />}   
            </div>
            

          </>
        )}
      </div>
    </header>
  );
}
