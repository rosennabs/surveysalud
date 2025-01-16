"use client";

import React, { useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useFormContext } from "../contexts/FormContext";
import { motion } from "motion/react";
import ContactForm from "../components/ContactForm";


const resourceCard =
  "flex flex-col bg-white cursor-pointer border rounded-2xl border-neutral-200 w-[350px] h-[150px] p-4 hover:bg-teal-600 hover:text-white";
const text = "ml-16 -mt-2 mb-2 text-xs";
const titleContainer = "flex flex-row space-x-2 m-4";
const image = "bg-teal-100 p-2 w-[35px]";

export default function Home() {
  const {
    baseButtonClassName,
    activeButtonClassName,
    activeButton,
    handleButtonClick,
  } = useFormContext();

  //Navigate to the resource hub in the homepage by searching for query parameter provided when resources is clicked
  const searchParams = useSearchParams();
  const resourceHubRef = useRef(null);


  useEffect(() => {
    if (
      searchParams.get("scrollTo") === "resource-hub" &&
      resourceHubRef.current
    ) {
      resourceHubRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [searchParams]);



  return (
    <div className="">

      <section className="relative flex items-center justify-center h-screen">
 
          {/* First background Image */}
          <img
            src="/sthethoscope.jpg"
            alt="Image of a sthethoscope"
          className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Text Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-white pl-24 w-1/2">
          <div>
            <motion.div
              initial={{ opacity: 0, x: 100 }} // Start off-screen to the right
              whileInView={{ opacity: 1, x: 0 }} // Move into view
              transition={{ duration: 2, ease: "easeOut" }} // Animation duration
              viewport={{ margin: "-100px" }} 
            >
            <h1 className="pb-8 leading-tight">
            Empower your community through data-driven healthcare decisions with SurveySalud.
            </h1>
        

          <Link href="/registration">
              <motion.button
                whileHover={{ scale: 1.4 }}
                whileTap={{ scale: 0.95 }}
              
                className={baseButtonClassName}
              >
                Get Started
              </motion.button>
              </Link>
              
            </motion.div>
          </div>
        </div>

      </section>

      {/* Second background Image */}

      <div className="h-[10px]"></div> {/* Add whitespace */}

      <section className="relative flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 100 }} // Start off-screen to the top
          whileInView={{ opacity: 1, y: 0 }} // Move into view
          transition={{ duration: 4, ease: "easeOut" }} // Animation duration
          viewport={{ margin: "-100px" }} 

        >
          <img
            src="/baby.jpg"
            alt="Picture of a baby"
            className="relative w-full h-auto"
          />
        

        {/* Text Content */}
        <div className="absolute inset-0 flex flex-col items-end justify-center z-10 text-white pr-24">
          <div className="absolute flex flex-col items-end w-1/2 pt-20">
            
            <h1 className="relative pb-8 leading-tight z-10 text-right">
              Your all-in-one platform for managing maternal and child health surveys. 
            </h1>

            <Link href="/learn-more">
              <motion.button
                whileHover={{ scale: 1.4 }}
                whileTap={{ scale: 0.95 }}

                  className={baseButtonClassName}
              >
               Contact Us
              </motion.button>
            </Link>
          </div>
          </div>
        </motion.div>
      </section>

     
    </div>
  );
}
