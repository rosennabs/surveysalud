'use client'

import React from 'react';
import Link from 'next/link';
import { useFormContext } from '../contexts/FormContext';



export default function Home() {

  const {
    baseButtonClassName,
    activeButtonClassName,
    activeButton,
    handleButtonClick } = useFormContext();
 
  
 
  return (  
    <div className='relative flex'>
      <div className="relative flex flex-col my-24 w-2/3 z-10">

        <h1 className="text-5xl text-black pb-8">PERFORMANCE MEASUREMENT & EVALUATION </h1>
        <p className='pb-8'> Performance measurement and evaluation are critical components of our success. By integrating both performance measurement and evaluation, we can gain valuable insights into how well we are achieving our objectives and make informed decisions. Click the button to learn how you can contribute towards our success as an organization.</p>

        <Link href='/learn-more'>
          <button onClick={() => handleButtonClick('learn more')} className={activeButton === 'learn more' ? activeButtonClassName : baseButtonClassName}>
            Learn more
          </button>
        </Link>

      </div>

      <div className='absolute top-0 right-0 w-2/3 z-0'>
        <img className="opacity-45 ml-32" src='/background.png' alt="Graphical background image" />
        
      </div>

    </div>

    
     
  );
}
