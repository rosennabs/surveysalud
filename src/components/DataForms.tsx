
import React, { useState, useEffect } from 'react';
import KnowledgeProducts from './KnowledgeProducts';
import Program from './Program';
import Relationships from './Relationships';

const menuItem = 'flex items-center justify-center rounded-lg mt-2 first:mt-0 cursor-pointer h-[80px]';
const activeMenuItemClass = 'bg-light-teal shadow-xl border border-light-grey text-black';



function Reporting({data_forms}) {

  // Initialize state with the value from local storage or default to 'Program'
  const [activeMenuItem, setActiveMenuItem] = useState(data_forms);

  useEffect(() => {
    const storedActiveMenuItem = localStorage.getItem('activeMenuItem');

    storedActiveMenuItem ? setActiveMenuItem(storedActiveMenuItem) : setActiveMenuItem(data_forms);

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
        {data_forms === "Program" && <p onClick={() => handleMenuClick("Program")} className={`${menuItem} ${activeMenuItem === "Program" ? activeMenuItemClass : 'bg-teal-500'}`}>Program</p>}

        {data_forms === "Knowledge Products" &&  <p onClick={() => handleMenuClick("Knowledge Products")} className={`${menuItem} ${activeMenuItem === "Knowledge Products" ? activeMenuItemClass : 'bg-teal-500'}`}>Knowledge Products</p>}
      
        {data_forms === "Relationships" && <p onClick={() => handleMenuClick("Relationships")} className={`${menuItem} ${activeMenuItem === "Relationships" ? activeMenuItemClass : 'bg-teal-500'}`}>Relationships</p>}

        {data_forms === "Improvement Projects" && <p onClick={() => handleMenuClick("Improvement Projects")} className={`${menuItem} ${activeMenuItem === "Improvement Projects" ? activeMenuItemClass : 'bg-teal-500'}`}>Improvement Projects</p>}

        {data_forms === "Healthcare Leaders" && <p onClick={() => handleMenuClick("Healthcare Leaders")} className={`${menuItem} ${activeMenuItem === "Healthcare Leaders" ? activeMenuItemClass : 'bg-teal-500'}`}>Healthcare Leaders</p>}

        {data_forms === "Patient Reach" && <p onClick={() => handleMenuClick("Patient Reach")} className={`${menuItem} ${activeMenuItem === "Patient Reach" ? activeMenuItemClass : 'bg-teal-500'}`}>Patient Reach</p>}

        {data_forms === "Sustainability" && <p onClick={() => handleMenuClick("Sustainability")} className={`${menuItem} ${activeMenuItem === "Sustainability" ? activeMenuItemClass : 'bg-teal-500'}`}>Sustainability</p>}

      </div>

      <div className='flex flex-col justify-center w-4/5'>
        {activeMenuItem === "Knowledge Products" && <KnowledgeProducts />}
        {activeMenuItem === "Program" && <Program />}
        {activeMenuItem === "Relationships" && <Relationships />}

      </div>
    </div>
  );
}

export default Reporting;