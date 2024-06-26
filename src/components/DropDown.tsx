import React from 'react';
import styled from 'styled-components';

const DropDownContainer = styled.div`
  background-color: white;
  width: 180px;
  position: absolute;
  cursor: pointer;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  top: 100%;
  left: 0;
  margin-top: 4px;
`;

const dropdownMenu = "p-2 hover:bg-teal-500 hover:text-white"

function DropDown() {
  return (
    <DropDownContainer>
      <p className={dropdownMenu}>About Us</p>
      <p className={dropdownMenu}>Our Team</p>
      <p className={dropdownMenu}>Services</p>

    </DropDownContainer>
  );
}

export default DropDown;