"use client";

import React, { useState } from "react";
import "../globals.css";
import { FaHome, FaChartLine, FaBabyCarriage, FaNutritionix, FaSearch, FaRegUserCircle } from "react-icons/fa";
import { FaPersonPregnant } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineLiveHelp, MdVaccines, MdMenu} from "react-icons/md";
import VaccineDashboard from "../../components/DashboardStatsGrid";
import NutritionDashboard from "../../components/NutritionDashboard";
import AntenatalDashboard from "../../components/AntenatalDashboard";
import PostnatalDashboard from "../../components/PostnatalDashboard";


function Dashboard() {

  const [isMenuExpanded, setIsMenuExpanded] = useState(true);
  const [isReportClicked, setIsReportClicked] = useState(false);

  const toggleMenu = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };

  const toggleReport = () => {
    setIsReportClicked(!isReportClicked);
  }

  return (
    <div className="flex mb-12">

      {/* side menu */}
      <div className={`navigation ${isMenuExpanded ? "w-[250px]" : "w-[80px]"} transition-all duration-500`}>
        <ul>
          <li>
            <a href="#">
              <span className="icon"><FaHome /></span>
              <span className="title">Home</span>
            </a>

          </li>
          <li onClick={() => toggleReport()}>
            <a href="#">
              <span className="icon"><FaChartLine /></span>
              <span className="title mr-4">Reports </span>
              <span ><IoIosArrowDown /> </span>
            </a>

          </li>

        
            <div className={`ml-4 overflow-hidden transition-all duration-500 ease-in-out ${
            isReportClicked ? "max-h-[500px]" : "max-h-0"
          }`}>
              <li>
                <a href="#">
                  <span className="icon"><FaPersonPregnant /></span>
                  <span className="title">Antenatal</span>
                </a>

              </li>
              <li>
                <a href="#">
                  <span className="icon"><FaNutritionix /></span>
                  <span className="title">Nutrition</span>
                </a>

              </li>

              <li>
                <a href="#">
                  <span className="icon"><FaBabyCarriage /></span>
                  <span className="title">Postnatal</span>
                </a>

              </li>
              <li>
                <a href="#">
                  <span className="icon"><MdVaccines /></span>
                  <span className="title">Vaccination</span>
                </a>

              </li>

            </div>
          
         
         
          <li>
            <a href="#">
              <span className="icon"><MdOutlineLiveHelp /></span>
              <span className="title">Help</span>
            </a>

          </li>
      
        </ul>
      </div>


      {/* chart area */}
      <div className={`${isMenuExpanded ? "w-[calc(100%-150px)] left-[300px]" : "w-full left-[150px]"
        } min-h-screen transition-all duration-500 px-8 `}>
        
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

        <PostnatalDashboard/>

      </div>

    </div>
  );
}


export default Dashboard;