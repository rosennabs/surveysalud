
import React from 'react';
import { FaSearch } from "react-icons/fa";

function Footer() {
  return (
    <section className="flex mx-32">
      <div className="w-2/5 mr-8">
        <form action="/search" method="GET" className="relative">
          <input className="border-solid border border-teal-500 w-full p-2 h-12 mb-4" type="text" name="search" placeholder="Search">
          </input>
          <FaSearch className="absolute top-4 right-4" />
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
  );
}

export default Footer;