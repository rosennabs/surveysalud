import React from 'react';

function Services() {
  return (
    <div className='flex flex-col'>
     
      <h1 className='flex justify-center uppercase'>Our Services</h1>
      <div className='flex justify-between mt-24'>

        <div className='flex flex-col border p-4 w-80'>
          <img className="rounded-xl" src="https://ece.emory.edu/_includes/images/sections/programs/Data-Analytics-Intro.jpg" alt="image placeholder" />
          <h4 className='flex justify-center mt-8 mb-4'>Data Analysis</h4>
          <p className='flex text-xs justify-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse elementum quam vitae massa fermentum tempor. Curabitur pretium velit quis imperdiet.</p>
          <span className='flex text-xs text-teal-500 underline underline-offset-2 hover:text-gray-400 hover:cursor-pointer justify-center mt-8'>Read more...</span>
        </div>

        <div className='flex flex-col border p-4 w-80'>
          <img className="rounded-xl" src="https://editor.analyticsvidhya.com/uploads/975301.jfif" alt="image placeholder" />
          <h4 className='flex justify-center mt-8 mb-4'>Reports</h4>
          <p className='flex text-xs justify-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse elementum quam vitae massa fermentum tempor. Curabitur pretium velit quis imperdiet.</p>
          <span className='flex text-xs text-teal-500 underline underline-offset-2 hover:text-gray-400 hover:cursor-pointer justify-center mt-8'>Read more...</span>
        </div>

        <div className='flex flex-col border p-4 w-80'>
          <img className="rounded-xl" src="https://d1ltgr77xghfz9.cloudfront.net/wp-content/uploads/2017/08/Business-Process-Performance-Measurement.jpg" alt="image placeholder" />
          <h4 className='flex justify-center mt-8 mb-4'>PMF</h4>
          <p className='flex text-xs justify-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse elementum quam vitae massa fermentum tempor. Curabitur pretium velit quis imperdiet.</p>
          <span className='flex text-xs text-teal-500 underline underline-offset-2 hover:text-gray-400 hover:cursor-pointer justify-center mt-8'>Read more...</span>
        </div>
        
      </div>
     
    </div>
  );
}

export default Services;
