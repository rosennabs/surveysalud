"use client";

import "../globals.css";
import { FaHome, FaUser, FaSignOutAlt, FaLock } from "react-icons/fa";
import { MdMessage, MdOutlineLiveHelp, MdOutlineSettings } from "react-icons/md";


function Dashboard() {
  
  return (
    <div className="container">
     
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
    
    </div>
  )
}

export default Dashboard;