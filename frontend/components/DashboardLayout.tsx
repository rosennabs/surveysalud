
import React, { useState } from "react";
import "../app/globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaChartLine, FaBabyCarriage, FaNutritionix } from "react-icons/fa";
import { FaPersonPregnant } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineLiveHelp, MdVaccines, MdMenu } from "react-icons/md";
import { useFormContext } from '../contexts/FormContext';


interface LayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {

  const { isReportClicked, setIsReportClicked, isMenuExpanded, setIsMenuExpanded } = useFormContext();
  
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };

  const toggleReport = () => {
    setIsReportClicked(!isReportClicked);
  };

  return (

    <div className="flex mb-12">

      {/* side menu */}
      <div className={`navigation ${isMenuExpanded ? "w-[250px]" : "w-[90px]"} transition-all duration-500`}>
        <ul>
          <li>
            <Link href="/dashboard">
              <span className="icon"><FaHome /></span>
              <span className="title">Home</span>
            </Link>

          </li>
          <li onClick={() => toggleReport()}>
            <Link href="#">
              <span className="icon"><FaChartLine /></span>
              <span className="title mr-4">Reports </span>
              <span ><IoIosArrowDown /> </span>
            </Link>

          </li>


          <div className={` pl-4 overflow-hidden transition-all duration-500 ease-in-out ${isReportClicked ? "max-h-[500px] py-6" : "max-h-0"
            }`}>
            <li>
              <Link href="/antenatal"
                className={pathname === "/antenatal" ? "active" : ""}
              > 
                <span className="icon"><FaPersonPregnant /></span>
                <span className="title">Antenatal</span>
              </Link>

            </li>
            <li>
              <Link href="/nutrition"
                className={pathname === "/nutrition" ? "active" : ""}
              >
                <span className="icon"><FaNutritionix /></span>
                <span className="title">Nutrition</span>
              </Link>

            </li>

            <li>
              <Link href="/postnatal"
                className={pathname === "/postnatal" ? "active" : ""}
              >
                <span className="icon"><FaBabyCarriage /></span>
                <span className="title">Postnatal</span>
              </Link>

            </li>
            <li>
              <Link href="/vaccination"
                className={pathname === "/vaccination" ? "active" : ""}
              >
                <span className="icon"><MdVaccines /></span>
                <span className="title">Vaccination</span>
              </Link>

            </li>

          </div>



          <li>
            <Link href="/help"
              className={pathname === "/help" ? "active" : ""}
            >
              <span className="icon"><MdOutlineLiveHelp /></span>
              <span className="title">Help</span>
            </Link>

          </li>

        </ul>
      </div>


      {/* chart area */}
      <div className={`${isMenuExpanded ? "w-[calc(100%-150px)] left-[300px]" : "w-full left-[150px]"
        } min-h-screen transition-all duration-500 px-8 `}>

        <div className="topbar gap-4">
          <div className="toggle cursor-pointer" onClick={toggleMenu}>
            <MdMenu />
          </div>

          <h4 className="">
            {pathname === "/antenatal" && "ANTENATAL"}
            {pathname === "/nutrition" && "CHILD NUTRITION"}
            {pathname === "/postnatal" && "POSTNATAL"}
            {pathname === "/vaccination" && "CHILD VACCINATION"}
            {pathname === "/help" && "DATA NOTES"}
          </h4>        
        </div>

        <main>{children}</main>
      </div>

    </div>

  );

}


export default DashboardLayout;