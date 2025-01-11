"use client";

import React, { useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useFormContext } from "../contexts/FormContext";
import OurServices from "../components/OurServices";
import ContactForm from "../components/ContactForm";
import OurTeam from "../components/OurTeam";

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


  // useEffect(() => {
  //   if (window.location.hash) {
  //     const element = document.getElementById(window.location.hash.substring(1)); // extract the id name from the url ignoring the hash
  //     if (element) {
  //       element.scrollIntoView({ behavior: "smooth" });
  //     }
  //   }
  // }, []);



  return (
    <div className="">

      <section className="relative flex items-center justify-center ">
 
          {/* Background Image */}
          <img
            src="/sthethoscope.jpg"
            alt="Image of a sthethoscope"
          className="relative w-full h-auto"
          />

          {/* Text Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-white pl-24 w-1/2">
        <div>
            <h1 className="pb-8 leading-tight">
           
            Empower your community through data-driven healthcare decisions with SurveySalud.
            {/* Welcome to SurveySalud – your all-in-one platform for managing maternal and child health surveys. Designed for NGOs, health workers, and community leaders, SurveySalud empowers you to collect, monitor, and analyze critical health data. From antenatal care to postnatal follow-ups, child vaccinations to nutrition monitoring, our dynamic system puts actionable insights at your fingertips. Tailor surveys to meet your community's needs and drive meaningful improvements in healthcare delivery */}
          </h1>

          <Link href="/learn-more">
            <button
              onClick={() => handleButtonClick("learn more")}
              className={
                activeButton === "learn more"
                  ? activeButtonClassName
                  : baseButtonClassName
              }
            >
              Learn more
            </button>
            </Link>
          </div>
        </div>

      </section>
      <img
        src="/baby.jpg"
        alt="Picture of a baby"
        className="relative w-full h-auto"
      />
      <section>

      </section>

     
    </div>
  );
}
