import React from "react";

function Button({ isSubmitting, status }) {
 
  return (
    <div className="flex flex-col w-full">

    <div className="flex w-full justify-center py-16">
    <button
      className={`py-2 px-6 bg-gray-300 rounded-xl shadow-xl ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}   
        type="submit"
        disabled={isSubmitting}
        
      > Submit</button>
      
      
      </div>

      {status && status.error && (
        <div className="flex text-red-500 mb-4 justify-center">{status.error}</div>
      )}
    </div>
  );
}

export default Button;
