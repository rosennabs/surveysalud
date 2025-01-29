"use client";

import React, { Suspense, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useFormContext } from "../contexts/FormContext";
import { motion } from "motion/react";

//Next.js 13.4 + enforces a rule that client components using useSearchParams (and some other hooks like useRouter) need to be wrapped in a < Suspense > boundary, so the framework can properly handle hydration and pre - rendered content.

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}

// All logic using useSearchParams goes here
function HomeContent() {
  const {baseButtonClassName} = useFormContext();

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
    <div>

      <section className="relative flex items-center justify-center h-screen">
 
          {/* First background Image */}
          <Image
            src="/sthethoscope.jpg"
          alt="Image of a sthethoscope"
          fill
          priority
          style={{ objectFit: 'cover' }}
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

      

     
    </div>
  );
}


