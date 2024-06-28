'use client'


import React, {useState, useEffect} from 'react';
import KnowledgeProducts from '../../components/KnowledgeProducts';
import Program from '../../components/Program';
import Relationships from '../../components/Relationships';

const menuItem = 'flex items-center justify-center bg-teal-500 rounded-md mt-2 first:mt-0 cursor-pointer';



function Reporting() {
  // Initialize state with the value from local storage or default to 'Program'
  const [activeMenuItem, setActiveMenuItem] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('activeMenuItem') || 'Program';
    }
    return 'Program';
  });

  // Save the active menu item to local storage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('activeMenuItem', activeMenuItem);
    }
  }, [activeMenuItem]);


  const handleMenuClick = (item: string) => {
    setActiveMenuItem(item);
  }

  return (
    <div className='flex justify-between m-32'>
     
      <div className='grid grid-cols-1 gap-4 w-1/6 h-[650px] text-white font-semibold'>
        <p onClick={() => handleMenuClick("Program")} className={menuItem}>Program</p>
        <p onClick={() => handleMenuClick("Knowledge Products")} className={menuItem}>Knowledge Products</p>
        <p onClick={() => handleMenuClick("Relationships")} className={menuItem}>Relationships</p>
        <p className={menuItem}>Improvement Projects</p>
        <p className={menuItem}>Healthcare Leaders</p>
        <p className={menuItem}>Patient Reach</p>
        <p className={menuItem}>Sustainability</p>
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