import React from 'react';
import { RxCross2 } from "react-icons/rx";

interface SuccessModalProps {
  toggleModal: () => void;
}

function SuccessModal({ toggleModal }: SuccessModalProps) {

  return (

    <div className='absolute flex flex-col left-1/2 transform -translate-x-1/2 bg-white rounded-lg border border-gray-300 shadow-lg py-6 px-2 sm:px-8 z-50 max-sm:w-[70vw]'>
      <div className='flex justify-end'>
        <button className="relative text-xs sm:text-lg border border-gray-500 rounded-full p-1" onClick={() => toggleModal()}>
          <RxCross2 />
        </button>
      </div>

      <div className='flex flex-col items-center justify-center'>
        <div className='text-center'>
          <h2 className='-mb-1'>Word Details</h2>
          <span className='text-sm'>Posted April 24, 2023</span>
        </div>


        <div className='flex max-sm:flex-wrap gap-4 sm:gap-12 text-sm sm:text-base items-center justify-center text-center mt-4'>
          <div className='flex flex-col'>
            <span>Views</span>
            <span>8400</span>
          </div>
          <div className='flex flex-col'>
            <span>Saves</span>
            <span>72</span>
          </div>
          <div className='flex flex-col'>
            <span>Likes</span>
            <span>122</span>
          </div>
          <div className='flex flex-col'>
            <span>Comments</span>
            <span>50</span>
          </div>
        </div>
      </div>


    </div>
  );
}

export default SuccessModal;