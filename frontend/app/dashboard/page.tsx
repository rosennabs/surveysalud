"use client";

import React, { useState } from "react";
import "../globals.css";
import { FaHome, FaUser, FaSignOutAlt, FaLock, FaSearch, FaRegUserCircle } from "react-icons/fa";
import { MdMessage, MdOutlineLiveHelp, MdOutlineSettings, MdMenu } from "react-icons/md";
import DashboardStatsGrid from "../../components/DashboardStatsGrid";


function Dashboard() {

  const [isMenuExpanded, setIsMenuExpanded] = useState(true);

  const toggleMenu = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };


  return (
    <div className="container">

      {/* side menu */}
      <div className={`navigation ${isMenuExpanded ? "w-[250px]" : "w-[80px]"} transition-all duration-500`}>
        <ul>
          <li>
            <a href="#">
              <span className="icon"><FaHome /></span>
              <span className="title">Dashboard</span>
            </a>

          </li>
          <li>
            <a href="#">
              <span className="icon"><FaUser /></span>
              <span className="title">Customers</span>
            </a>

          </li>
          <li>
            <a href="#">
              <span className="icon"><MdMessage /></span>
              <span className="title">Message</span>
            </a>

          </li>
          <li>
            <a href="#">
              <span className="icon"><MdOutlineLiveHelp /></span>
              <span className="title">Help</span>
            </a>

          </li>
          <li>
            <a href="#">
              <span className="icon"><MdOutlineSettings /></span>
              <span className="title">Settings</span>
            </a>

          </li>
          <li>
            <a href="#">
              <span className="icon"><FaLock /></span>
              <span className="title">Password</span>
            </a>

          </li>
          <li>
            <a href="#">
              <span className="icon"><FaSignOutAlt /></span>
              <span className="title">Sign Out</span>
            </a>

          </li>
        </ul>
      </div>


      {/* chart area */}
      <div className={`absolute ${isMenuExpanded ? "w-[calc(100%-150px)] left-[300px]" : "w-full left-[150px]"
        } min-h-screen transition-all duration-500 px-8`}>
        
        <div className="topbar">
          <div className="toggle cursor-pointer" onClick={toggleMenu}>
            <MdMenu />
          </div>

          {/* search bar */}
          <div className="search">
            <label>
              <input
                type='text'
                placeholder="Search here"
              />
              <FaSearch className="absolute top-0 left-4" />

            </label>
          </div>

          {/* user profile */}
          <div className="user">
            <FaRegUserCircle className="relative text-3xl cursor-pointer" />
          </div>
        </div>

        <DashboardStatsGrid />

      </div>

    </div>
  );
}


export default Dashboard;