"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

//Define types for form values
interface FormValues {
  program: string;
  title: string;
  date: number | string;
  type: string;
  language: string;
  audience: string;
  purpose: string;
}

const programs: string[] = [
  "Rural health care",
  "Leadership capacity building",
  "Indigenous services",
  "Long term care",
  "Primary care intervention",
];

const kp_types: string[] = ["Webinar", "Poster", "Article", "Blog"];

const languages: string[] = ["English", "French", "Both", "Others"];

const kp_audience: string[] = [
  "Frontline workers",
  "Patients",
  "General public",
  "Caregivers",
];

const kp_purpose: string[] = [
  "Capacity building",
  "Information dissemination",
  "Public health campaign",
  "Health promotion",
];

const initialValues: FormValues = {
  program: "",
  title: "",
  date: "",
  type: "",
  language: "",
  audience: "",
  purpose: "",
};


function Knowledge_Products() {

  return (
    <div className=" w-full pt-40 flex flex-col items-center">
      <h1 className="text-5xl pb-16">Knowledge Products</h1>

      <div className="flex flex-col items-center justify-center bg-green-200 p-16 w-5/6 shadow-xl rounded-xl">
        <Formik
          initialValues={initialValues}
          
          onSubmit={(values, actions) => {
            console.log('Submitted values: ', values);
            actions.setSubmitting(false);
          }}
          
          validate={(values) => {
            const errors = {};

            for (const key of Object.keys(initialValues)) {
              
              if (!values[key] || values[key] === "Select a program") {
                console.log(values);
                
                errors[key] = 'Required';
              }             

            }

            return errors
          }}
          validateOnMount //Ensures form is validated upon submission
        >

          <Form className="flex flex-wrap text-2xl">
            <div className="flex flex-col p-4 w-full">
              <label htmlFor="program" className="pb-4">
                Program
              </label>
              <Field
                className="border-solid border-2 border-gray-300 w-full rounded-lg p-2"
                as="select"
                id="program"
                name="program">
                
                <option value="">Select a program</option>

                {programs.map((program) => (
                  <option key={program} value={program}>{program}</option>
                ))}
             

            </Field>
              <ErrorMessage className='text-red-600' name='program'/>
            </div>

            <div className="flex flex-col p-4 w-full">
              <label htmlFor="title" className="pb-4">
                Title of KP
              </label>
              <Field
                className="border-solid border-2 border-gray-300 w-full rounded-lg p-2"
                id="title"
                name="title"
              />
              <ErrorMessage name='title' className='text-red-600' />
            </div>

            <div className="flex felx-row w-full">
              <div className="flex flex-col p-4 w-2/5">
                <label htmlFor="date" className="pb-4">
                  Publication date of KP
                </label>
                <Field
                  className="border-solid border-2 border-gray-300 w-full rounded-lg p-2"
                  id="date"
                  name="date"
                />
                <ErrorMessage name='date' />
              </div>

              <div className="flex flex-col p-4 w-3/5">
                <label htmlFor="kp_type" className="pb-4">
                  Type of KP
                </label>
                <Field
                  className="border-solid border-2 border-gray-300 w-full rounded-lg p-2"
                  as='select'
                  id="type"
                  name="type">
                  
                  <option value="">Select an option</option>
                  {kp_types.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                  </Field>
                <ErrorMessage name='type' />
              </div>
            </div>

            <div className="flex flex-col p-4 w-full">
              <label htmlFor="purpose" className="pb-4">
                Primary purpose of KP
              </label>
              <Field
                className="border-solid border-2 border-gray-300 w-full rounded-lg p-2"
                as='select'
                id="purpose"
                name="purpose"
                >
                <option value="">Select an option</option>
              
                {kp_purpose.map((purpose) => (
                  <option key={purpose} value={purpose}>{purpose}</option>
                ))}
               </Field>
               
              
              <ErrorMessage name='purpose' />
            </div>

            <div className="flex felx-row w-full">
              <div className="flex flex-col p-4 w-2/5">
                <label htmlFor="language" className="pb-4">
                  Language of KP
                </label>
                <Field
                  className="border-solid border-2 border-gray-300 w-full rounded-lg p-2"
                  as='select'
                  id="language"
                  name="language"
                >
                 
                  {languages.map((language) => (
                    <option key={language} value={language}>{language}</option>
                  ))}
                </Field>
                <ErrorMessage name='language' />
              </div>

              <div className="flex flex-col p-4 w-3/5">
                <label htmlFor="audience" className="pb-4">
                  Target Audience
                </label>
                <Field
                  className="border-solid border-2 border-gray-300 w-full rounded-lg p-2"
                  as='select'
                  id="audience"
                  name="audience"
                >
                  <option value="">Select an option</option>

                  {kp_audience.map((audience) => (
                    <option key={audience} value={audience}>{audience}</option>
                  ))}
                </Field>
                <ErrorMessage name='audience' />
              </div>
            </div>

            <div className='flex w-full justify-center py-16'>
              <button className='py-2 px-6 bg-gray-300 rounded-xl shadow-xl' type="submit"> Submit </button>
            </div>

            
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Knowledge_Products;
