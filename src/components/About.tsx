import React from "react";
import ContactForm from "./ContactForm";

function About() {
  return (
    <div>
      <div className="my-48 mx-32">
        <section className="mb-48">
          <h1>Our Services</h1>
        </section>
        
        <section className="mb-48">
          <h1>Meet Our Team</h1>
        </section>
      </div>

      <div className="w-full">
        <ContactForm />
      </div>
    </div>
  );
}

export default About;
