import React from 'react';

const dropdownMenu = "p-2 hover:bg-teal-500 hover:text-white"

function DropDown() {
  return (
    <div className='dropdown bg-white w-[180px] shadow-lg absolute top-full left-0 mt-1 hidden group-hover:block'>
      <p className={dropdownMenu}>About Us</p>
      <p className={dropdownMenu}>Our Team</p>
      <p className={dropdownMenu}>Services</p>

    </div>
  );
}

export default DropDown;