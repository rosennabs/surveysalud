import React from 'react';
import { FaPhoneSquareAlt, FaLinkedin } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

function Team() {
  return (
    <>
      <h1 className='flex justify-center uppercase mb-24'>Meet Our Team</h1>
      
    <div className='flex space-x-8'>
        <div className='p-2 border'>
          <img className="rounded-xl" src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-1340965823.jpg?" alt="image placeholder" />
          <h3 className='flex justify-center my-8'>John Smith</h3>
          <div className='flex justify-between'>
            <span className='bg-gray-200 py-1 px-4 rounded-xl'>Senior Program Manager</span>
            <div className='flex space-x-2 p-2'>
              <FaPhoneSquareAlt />
              <FaLinkedin />
              <MdOutlineEmail />
            </div>
          </div>
      </div>
      <div className='p-2 border'>
          <img className="rounded-xl" src="https://hips.hearstapps.com/hmg-prod/images/the-shiba-inu-species-is-looking-at-its-owner-in-royalty-free-image-1656368953.jpg?" alt="image placeholder" />

          <h3 className='flex justify-center my-8'>Kelly Round</h3>
          <div className='flex justify-between'>
            <span className='bg-gray-200 py-1 px-4 rounded-xl'>Measurement Analyst</span>
            <div className='flex space-x-2 p-2'>
              <FaPhoneSquareAlt />
              <FaLinkedin />
             <MdOutlineEmail />
            </div>
          </div>
      </div>
      <div className='p-2 border'>
          <img className="rounded-xl" src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-1094874726.png?" alt="image placeholder" />

          <h3 className='flex justify-center my-8'>Xan Jay</h3>
          <div className='flex justify-between'>
            <span className='bg-gray-200 py-1 px-4 rounded-xl'>Evaluation Consultant</span>
            <div className='flex space-x-2 p-2'>
              <FaPhoneSquareAlt />
              <FaLinkedin />
              <MdOutlineEmail />
            </div>
          </div>
      </div>
      </div>
    </>
  );
}

export default Team;