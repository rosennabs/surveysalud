
import React, { useState, useEffect } from 'react';
import Antenatal from './Antenatal';
import ChildVaccination from './ChildVaccination';
import ChildNutrition from './ChildNutrition';
import Postnatal from './Postnatal';
import { IoMdAddCircle } from "react-icons/io";

const menuItem = 'flex items-center justify-center text-center rounded-lg my-4 first:mt-0 cursor-pointer h-[80px]';
const activeMenuItemClass = 'bg-light-teal shadow-xl border border-light-grey text-black';



function DataForms({ data_forms, handleAddForm }) {

  // Initialize state with the value from local storage or default to 'Program'
  const [activeMenuItem, setActiveMenuItem] = useState(data_forms[0]);

  // Retrieve stored values from local storage on component mount
  useEffect(() => {
    const storedActiveMenuItem = localStorage.getItem('activeMenuItem');
  
    storedActiveMenuItem && setActiveMenuItem(storedActiveMenuItem);

  }, []);

  // Save the active menu item to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('activeMenuItem', activeMenuItem);
  }, [activeMenuItem]);


  const handleMenuClick = (item: string) => {
    setActiveMenuItem(item);
  };



  return (
    <div className='flex justify-between m-32'>

      <div className='flex flex-col w-1/6 text-white font-semibold'>
        {data_forms.map((form) => (
          <span key={form} onClick={() => handleMenuClick(form)} className={`${menuItem} ${activeMenuItem === form ? activeMenuItemClass : 'bg-teal-500'}`}>{form}</span>
        ))}

        <div className='flex items-center justify-center space-x-4 mt-8 text-black w-full'>
          <IoMdAddCircle onClick={() => handleAddForm()}  className='text-3xl text-green-600 hover:text-gray-400 cursor-pointer' />
          <span>Add form</span>
        </div>

      </div>

      <div className='flex flex-col justify-center w-4/5'>
        
        {activeMenuItem === "Child Vaccination" && <ChildVaccination />}
        {activeMenuItem === "Child Nutrition" && <ChildNutrition />}
        {activeMenuItem === "Antenatal Care Assessment" && <Antenatal />}
        {activeMenuItem === "Postnatal Care Assessment" && <Postnatal />}
        

      </div>
    </div>
  );
}

export default DataForms;