import React from "react";

function Button({ isSubmitting, status }) {
 
  return (
    <div className="flex flex-col w-full">

    <div className="flex w-full justify-center py-16">
    <button
          className={`py-2 px-6 bg-gradient-to-b from-primary-start to-primary-end text-white hover:text-light-grey rounded-xl shadow-xl ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}   
        type="submit"
        disabled={isSubmitting}
        
      > Sign in</button>
      
      
      </div>

      {status && status.error && (
        <div className="flex text-red-500 mb-4 justify-center">{status.error}</div>
      )}
    </div>
  );
}

export default Button;
