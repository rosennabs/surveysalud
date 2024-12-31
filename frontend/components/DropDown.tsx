
import React from "react";
import styled from "styled-components";

export const DropDownContainer = styled.div`
  background-color: white;
  border: 1px solid #d3d3d3;
  width: 180px;
  position: absolute;
  cursor: pointer;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  top: 100%;
  left: 0;
  margin-top: 15px;
  z-index: 10;
`;

export const dropdownMenu = "p-2 hover:bg-teal-500 hover:text-white"



export function AboutDropDown() {

  const handleMenuClick = (item: string) => {
    console.log("menu clicked");
    
    const targetId = item === "services" ? "our-services" : item === "team" ? "the-team" : "contact-us";

    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, null, `#${targetId}`); //add id name to the browser url
    }
        
  }
  

  return (
    <DropDownContainer>
      <p onClick={()=> handleMenuClick("services")} className={dropdownMenu}>Our Services</p>
      <p onClick={() => handleMenuClick("team")} className={dropdownMenu}>The Team</p>
      <p onClick={() => handleMenuClick("contact")} className={dropdownMenu}>Contact us</p>

    </DropDownContainer>
  );
}

