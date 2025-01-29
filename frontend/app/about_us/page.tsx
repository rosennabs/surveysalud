"use client"

import React from 'react';
import { motion } from "motion/react";
import Image from "next/image";


const AboutUs = () => {

  return (
    <div className='text-xl'>

      
      {/*Our mission */}

    <section className="relative flex items-center justify-center ">
      <motion.div
        initial={{ opacity: 0, x: 500 }} // Start off-screen to the right
        whileInView={{ opacity: 1, x: 0 }} // Move into view
          transition={{  duration: 1, ease: "easeOut" }} // Animation duration
          viewport={{ once: true}}

      >
          <Image
            src="/about_us.jpg"
            alt="Picture of a team"
            width={1250}          
            height={500}          
            className="relative w-full h-auto"
/>

        {/* Text Content */}
        <div className="absolute inset-0 flex flex-col items-end justify-center z-10 text-white pr-24">
          <div className="absolute flex flex-col items-end w-1/2 pt-20">

            <h1 className="relative pb-8 leading-tight z-10 text-right">
                &quot;Our mission is to simplify the collection and analysis of healthcare data, empowering communities to improve health outcomes for mothers and children.&quot;
            </h1>
 
          </div>
        </div>
      </motion.div>
    </section>


      <div className="h-[60px] bg-yellow-500"></div> {/* Add whitespace */}

      

      {/* Who we serve */}


      <section>
        <motion.div
          initial={{ opacity: 0, y: 100 }} // Start off-screen to the right
          whileInView={{ opacity: 2, y: 0 }} // Move into view
          transition={{ duration: 0.5, ease: "easeOut" }} // Animation duration
          viewport={{ once: true}}

        >
        
        <div className='flex justify-between mt-12 '>
          <div className='flex flex-col ml-24 w-1/2'>
            <h2 className='border-b border-yellow-500 pb-4'> Who We Serve </h2>

              <div className='pr-12 space-y-8'>
                <p className='mt-12'>We envision a world where maternal and child health is prioritized, and every community is empowered with the tools and knowledge to ensure healthier generations through better care, informed decisions, and equitable healthcare delivery.</p>

                <p className='font-bold'>Our platform is targetted at :</p>

                <ul className='list-disc ml-8 space-y-4'>
                  <li>NGOs working in maternal and child health.</li>
                  <li>Community leaders aiming to improve healthcare access.</li>
                  <li >Health workers managing local or regional health programs.</li>
                </ul>
              </div>
            
          </div>

          <Image
            src="/workers.jpg"
              alt="Photo of a team"
              width={700}
              height={300}
          />
          </div>
        </motion.div>
      </section>

      <div className="h-[120px]"></div> {/* Add whitespace */}

      


      {/* Core Values */}


      <section>
        <motion.div
          initial={{ opacity: 0, y: 100 }} // Start off-screen to the right
          whileInView={{ opacity: 1, y: 0 }} // Move into view
          transition={{ duration: 0.5, ease: "easeOut" }} // Animation duration
          viewport={{ once: false}}
        >
          <div className='flex justify-between mt-12 '>
            <Image
              src="/core_values.jpg"
              alt="Photo of children"
              width={700}
              height={300}
            />

            <div className='flex flex-col mr-24 w-1/2'>
              <h2 className='border-b border-yellow-500 pb-4 pl-24 mb-12'> Our Core Values </h2>

              <div className='pl-24'>
                <p className="mb-4"><strong>Community Centric — </strong>We prioritize the needs of local communities.</p>
                <p className="mb-4"><strong>Empowerment — </strong>We enable users to take control of their healthcare data.</p>
                <p className="mb-4"><strong>Innovation — </strong>We use technology to bridge gaps in public health.</p>
                <p className="mb-4"><strong>Integrity — </strong>We are committed to data security and ethical practices.</p>
              </div>
            </div>   
          </div>
        </motion.div>
      </section>

      <div className="h-[120px]"></div> {/* Add whitespace */}

      

      {/* Why choose surveysalud*/}

      <section className=''>
        <motion.div
          initial={{ opacity: 0, y: 200 }} // Start off-screen to the right
          whileInView={{ opacity: 1, y: 0 }} // Move into view
          transition={{ duration: 0.5, ease: "easeOut" }} // Animation duration
          viewport={{ once: false}}
        >
          <div className='mx-24'>
            <h2 className='border-b border-yellow-500 pb-4 mb-12'> Why Choose SurveySalud ? </h2>

            <p>With the platform you can design maternal and child health surveys, deploy them to communities, and monitor results in real-time.</p>

          </div>
          
        

          <div className='mx-24'>
            <div className='flex justify-between my-24'>
              <h4 className='w-1/5'>Customizable Surveys</h4>
              <p className='text-base w-2/3'>Design and manage surveys tailored to the unique needs of your community. By focusing on maternal and child health, SurveySalud helps you gather and analyze data on antenatal care, postnatal follow-ups, child vaccinations, and nutrition.</p>
            </div>

            <div className='flex justify-between my-24'>
              <h4 className='w-1/5'>Centralized Management</h4>
              <p className='text-base w-2/3'>SurveySalud streamlines the entire process of maternal and child health data collection, allowing users to manage multiple surveys in one platform. </p>
            </div>

            <div className='flex justify-between my-24'>
              <h4 className='w-1/6'> Real - Time Insights</h4>
              <p className='text-base w-2/3'>Visualize data with dynamic dashboards. With our intuitive dashboards, users can identify trends, track progress, and implement actionable solutions—all from a single platform.</p>
            </div>

            <div className='flex justify-between my-24'>
              <h4 className='w-1/5'>Scalable</h4>
              <p className='text-base w-2/3'>Suitable for communities of any size.</p>
            </div>
          </div>
          
        </motion.div>
      </section>
    </div>
  )
}

export default AboutUs;