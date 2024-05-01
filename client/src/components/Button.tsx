import React from "react";

function Button({ isSubmitting }) {
 
  return (
    <div className="flex w-full justify-center py-16">
    <button
      className={`py-2 px-6 bg-gray-300 rounded-xl shadow-xl ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}   
        type="submit"
        disabled={isSubmitting}
        
    > Submit</button>
    </div>
  );
}

export default Button;
