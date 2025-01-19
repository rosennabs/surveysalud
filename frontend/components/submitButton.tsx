import React from "react";
import { motion } from "motion/react";


function Button({ isSubmitting, status, text }) {
 
  return (
    <div className="flex flex-col w-full">

      <div className="flex w-full justify-center py-12">
        
       
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
          className={`py-3 px-8 bg-gradient-to-b from-primary-start to-primary-end text-white hover:text-light-grey rounded-xl shadow-xl ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}   
        type="submit"
        disabled={isSubmitting}
        
        > {text}</motion.button>
      
      
      </div>

      {status && status.error && (
        <div className="flex text-red-500 mb-4 justify-center">{status.error}</div>
      )}
    </div>
  );
}

export default Button;
