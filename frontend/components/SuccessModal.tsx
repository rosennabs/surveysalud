import React from 'react';
import { useFormContext } from '../contexts/FormContext';




function SuccessModal() {
  const { setSuccessMessage } = useFormContext();

  return (

    <div className='absolute flex flex-col items-center justify-center left-1/2 transform -translate-x-1/2 bg-white rounded-lg border border-gray-300 shadow-lg py-6 px-2 sm:px-8 z-50 w-[60vw] h-[300px] max-sm:w-[70vw]'>

      <div className='flex flex-col items-center'>
          <h2 className='mb-4'>Thank you!</h2>
          <p className='text-sm mb-8'>Your submission has been successfully received</p>

          <button className="py-2 px-6 bg-gradient-to-b from-primary-start to-primary-end text-white hover:text-light-grey rounded-xl shadow-xl" onClick={() => setSuccessMessage(false)}> Close </button>
          

      </div>


    </div>
  );
}

export default SuccessModal;