"use client";

import React, {useEffect} from "react";
import "../globals.css";
import { FaHome, FaUser, FaSignOutAlt, FaLock, FaSearch, FaRegUserCircle } from "react-icons/fa";
import { MdMessage, MdOutlineLiveHelp, MdOutlineSettings, MdMenu } from "react-icons/md";
import DashboardStatsGrid from "../../components/DashboardStatsGrid";


function Dashboard() {

  useEffect(() => {
    // Dashboard: add hovered class to selected list item

    const listItems = document.querySelectorAll('.navigation li');

    function activeLink() {
      listItems.forEach((item) =>
        item.classList.remove('hovered'));
       this.classList.add('hovered');    
    }

    listItems.forEach((item) =>
      item.addEventListener('mouseover', activeLink));

    //Menu toggle
    const toggle = document.querySelector('.toggle');
    const navigation = document.querySelector('.navigation');
    const dashboard = document.querySelector('.dashboard');

    toggle.onclick = function () {
      navigation.classList.toggle('active');
      dashboard.classList.toggle('active');
    }

  }, [])
  
  return (
    <div className="container">
     
      {/* side menu */}
      <div className="navigation">
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


      {/* top menu */}
      <div className="dashboard">
        <div className="topbar">
          <div className="toggle">
            <MdMenu />
          </div>

          {/* search bar */}
          <div className="search">
            <label>
              <input
                type='text'
                placeholder="Search here"
              />
                <FaSearch className="absolute top-0 left-4"/>
           
            </label>
          </div>

          {/* user profile */}
          <div className="user">
            <FaRegUserCircle className="relative text-3xl cursor-pointer"/>
          </div>
        </div>

        <DashboardStatsGrid />

      </div>
    
    </div>
  )
}


export default Dashboard;