import React from 'react';

function Team() {
  return (
    <div className='flex flex-col'>
      <h1 className='flex justify-center uppercase'>Meet Our Team</h1>
      <div className='my-24 p-2 border '>
        <img className="rounded-xl" src="https://picsum.photos/id/65/300/400" alt="image placeholder" />
      </div>
      <div className='p-2 border'>
        <img className="rounded-xl" src="https://picsum.photos/id/65/300/400" alt="image placeholder" />
      </div>
    </div>
  );
}

export default Team;