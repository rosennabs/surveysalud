"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useFormContext } from "../contexts/FormContext";
import ContactForm from '../components/ContactForm';
import { FaSearch } from "react-icons/fa";

const resourceCard =
  "flex flex-col bg-white cursor-pointer border rounded-2xl border-neutral-200 w-[350px] p-4";
const activeResourceCard =
  "flex flex-col bg-gradient-to-b from-primary-start to-primary-end text-white shadow-2xl border border-neutral-300 rounded-2xl w-[350px] p-4";
const h5 = "text-2xl montserrat-semibold";
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

  const [resourceClicked, setResourceClicked] = useState(null);

  const handleResourceClick = (title: string) => {
    setResourceClicked(title);
  };

  return (
    <div className="flex flex-col">

      {/* Section: PMF */}

      <section className="relative flex mx-32">
        <div className="relative flex flex-col my-24 w-2/3 z-10">
          <h1 className="text-5xl text-black pb-8">
            PERFORMANCE MEASUREMENT & EVALUATION{" "}
          </h1>
          <p className="pb-8">
            {" "}
            Performance measurement and evaluation are critical components of
            our success. By integrating both performance measurement and
            evaluation, we can gain valuable insights into how well we are
            achieving our objectives and make informed decisions. Click the
            button to learn how you can contribute towards our success as an
            organization.
          </p>

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

        <div className="absolute top-0 right-0 w-2/3 z-0">
          <img
            className="ml-10"
            src="/Image.png"
            alt="Graphical background image"
          />
        </div>
      </section>


      {/* Section: Resource Hub */}

      <section className="flex flex-col items-center mx-32">

        <h1 className="text-5xl text-black mt-48 pb-8 z-10">RESOURCE HUB</h1>

        <div className="flex flex-row justify-between text-black w-full z-10 mt-16">
          <div
            onClick={() => handleResourceClick("Annual Report")}
            className={
              resourceClicked === "Annual Report"
                ? activeResourceCard
                : resourceCard
            }
          >
            <div className={titleContainer}>
              <img className={image} src="/bar chart.svg" alt="a bar chart" />
              <h1 className={h5}>Annual Report</h1>
            </div>

            <p className={text}>
              2023-24 Annual Report. Take a deep dive into our annual progress.
            </p>
          </div>

          <div
            onClick={() => handleResourceClick("Directory")}
            className={
              resourceClicked === "Directory" ? activeResourceCard : resourceCard
            }
          >
            <div className={titleContainer}>
              <img className={image} src="/book.svg" alt="a book" />
              <h1 className={h5}>Directory</h1>
            </div>
            <p className={text}>
              Search for the meaning of our indicators in the PMF directory.
            </p>
          </div>

          <div
            onClick={() => handleResourceClick("Logic Model")}
            className={
              resourceClicked === "Logic Model"
                ? activeResourceCard
                : resourceCard
            }
          >
            <div className={titleContainer}>
              <img className={image} src="/puzzle.svg" alt="a puzzle" />
              <h1 className={h5}>Logic Model</h1>
            </div>
            <p className={text}>
              This is where we connect the dots to achieve our ultimate goal.
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between w-full z-10 mt-16">
          <div
            onClick={() => handleResourceClick("Change Theory")}
            className={
              resourceClicked === "Change Theory"
                ? activeResourceCard
                : resourceCard
            }
          >
            <div className={titleContainer}>
              <img className={image} src="/loop.svg" alt="a loop" />
              <h1 className={h5}>Change Theory</h1>
            </div>
            <p className={text}>
              Understand our theory of change and how we intend to make a
              difference.
            </p>
          </div>

          <div
            onClick={() => handleResourceClick("Annual Targets")}
            className={
              resourceClicked === "Annual Targets"
                ? activeResourceCard
                : resourceCard
            }
          >
            <div className={titleContainer}>
              <img className={image} src="/target.svg" alt="round target" />
              <h1 className={h5}>Annual Targets</h1>
            </div>
            <p className={text}>See what we have set out to achieve this year.</p>
          </div>

          <div
            onClick={() => handleResourceClick("PMF")}
            className={
              resourceClicked === "PMF" ? activeResourceCard : resourceCard
            }
          >
            <div className={titleContainer}>
              <img className={image} src="/graph.svg" alt="a line graph" />
              <h1 className={h5}>PMF</h1>
            </div>
            <p className={text}>
              The Performance Measurement Framework outlines our indicators.
            </p>
          </div>
        </div>
      </section>

      <section className="my-48 relative">
        <div className="relative">
          <img className="w-full" src="/contact.svg" alt="a trapezium" />
        </div>

        <div className="absolute inset-0 items-center flex text-4xl text-white montserrat-semibold z-10">
          <p className="ml-32">Contact us</p>
          <div className="text-base text-black montserrat-regular w-1/2 ml-64">
            <ContactForm />
          </div>

        </div>
      </section>

      <section className="flex mx-32">
        <div className="w-2/5 mr-8">
          <form action="/search" method="GET" className="relative">
            <input className="border-solid border border-teal-500 w-full p-2 h-12 mb-4" type="text" name="search" placeholder="Search">    
            </input>
            <FaSearch className="absolute top-4 right-4"/>
          </form>

          <p className="mb-2">Privacy</p>
          <p className="mb-2">Terms of Use</p>
          
        </div>

        <div className="flex justify-between w-3/5">
          <div className="flex flex-col" >
            <h5 className="text-lg pb-4 montserrat-semibold">Quick links</h5>
            <p className="mb-2">About</p>
            <p className="mb-2">Our Team</p>
            <p className="mb-2">Directory</p>
            <p className="mb-2">Leave Feedback</p>
          </div>
          
          <div className="flex flex-col" >
            <h5 className="text-lg pb-4 montserrat-semibold">Resources</h5>
            <p className="mb-2">Annual Reports</p>
            <p className="mb-2">Annual Targets</p>
            <p className="mb-2">Change Theory</p>
            <p className="mb-2">Logic Model</p>
          </div>

          <div className="flex flex-col" >
            <h5 className="text-lg pb-4 montserrat-semibold">Our Progress</h5>
            <p className="mb-2">PMF</p>
            <p className="mb-2">Dashboard</p>
            <p className="mb-2">Logic Model</p>
            <p className="mb-2">Quarterly Reports</p>
          </div>

        </div>
      </section>


    </div>
  );
}
