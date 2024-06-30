
import React, { useState, useEffect } from 'react';
import KnowledgeProducts from './KnowledgeProducts';
import Program from './Program';
import Relationships from './Relationships';

const menuItem = 'flex items-center justify-center rounded-lg my-4 first:mt-0 cursor-pointer h-[80px]';
const activeMenuItemClass = 'bg-light-teal shadow-xl border border-light-grey text-black';



function Reporting({data_forms}) {

  // Initialize state with the value from local storage or default to 'Program'
  const [activeMenuItem, setActiveMenuItem] = useState(data_forms[0]);

  useEffect(() => {
    const storedActiveMenuItem = localStorage.getItem('activeMenuItem');

    storedActiveMenuItem ? setActiveMenuItem(storedActiveMenuItem) : setActiveMenuItem(data_forms[0]);

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
          <p key={form} onClick={() => handleMenuClick(form)} className={`${menuItem} ${activeMenuItem === form ? activeMenuItemClass : 'bg-teal-500'}`}>{form}</p>
        ))}

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