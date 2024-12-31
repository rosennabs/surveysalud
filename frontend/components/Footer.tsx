
import React from 'react';
import { FaSearch } from "react-icons/fa";

function Footer() {
  return (
    <section className="flex mx-32 mt-8">
      <div className="w-2/5 mr-8">
        <form action="/search" method="GET" className="relative">
          <input className="border-solid border border-light-grey w-full span-2 h-12 mb-16 pl-2" type="text" name="search" placeholder="Search">
          </input>
          <FaSearch className="absolute top-4 right-4" />
        </form>

        <p className="mb-2">Privacy</p>
        <p className="mb-2">Terms of Use</p>

      </div>

      <div className="flex justify-between w-3/5">
        <div className="flex flex-col" >
          <h5 className="text-lg pb-4 montserrat-semibold">Quick links</h5>
          <span className="mb-2">About</span>
          <span className="mb-2">Our Team</span>
          <span className="mb-2">Directory</span>
          <span className="mb-2">Leave Feedback</span>
        </div>

        <div className="flex flex-col" >
          <h5 className="text-lg pb-4 montserrat-semibold">Resources</h5>
          <span className="mb-2">Annual Reports</span>
          <span className="mb-2">Annual Targets</span>
          <span className="mb-2">Change Theory</span>
          <span className="mb-2">Logic Model</span>
        </div>

        <div className="flex flex-col" >
          <h5 className="text-lg pb-4 montserrat-semibold">Our Progress</h5>
          <span className="mb-2">PMF</span>
          <span className="mb-2">Dashboard</span>
          <span className="mb-2">Logic Model</span>
          <span className="mb-2">Quarterly Reports</span>
        </div>

      </div>
    </section>
  );
}

export default Footer;