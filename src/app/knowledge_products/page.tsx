"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

//Define types for form values
interface FormValues {
  program: string[];
  title: string;
  date: number | string;
  type: string[];
  language: string[];
  audience: string[];
  purpose: string[];
}

const program: string[] = [
  "Rural health care",
  "Leadership capacity building",
  "Indigenous services",
  "Long term care",
  "Primary care intervention",
];

const kp_type: string[] = ["Webinar", "Poster", "Article", "Blog"];

const language: string[] = ["English", "French", "Both", "Others"];

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
  program: [],
  title: "",
  date: "",
  type: [],
  language: [],
  audience: [],
  purpose: [],
};


function Knowledge_Products() {

  return (
    <div className=" w-full pt-40 flex flex-col items-center">
      <h1 className="text-5xl pb-16">Knowledge Products</h1>

      <div className="flex flex-col items-center justify-center bg-green-200 p-16 w-5/6 shadow-xl rounded-xl">
        <Formik
          initialValues={initialValues}
          
          onSubmit={(values, actions) => {
            console.log('Form values: ', values);
            actions.setSubmitting(false);
          }}
          
          validate={(values) => {
            const errors = {};

            for (const key of Object.keys(initialValues)) {
              
              if (!values[key]) {
                errors[key] = 'Required';
              }             

            }

            return errors
          }}
          validateOnMount
        >
          <Form className="flex flex-wrap text-2xl">
            <div className="flex flex-col p-4 w-full">
              <label htmlFor="program" className="pb-4">
                Program
              </label>
              <Field
                className="border-solid border-2 border-gray-300 w-full rounded-lg"
                id="program"
                name="program"
              />
              <ErrorMessage className='text-red-600' name='program'/>
            </div>

            <div className="flex flex-col p-4 w-full">
              <label htmlFor="title" className="pb-4">
                Title of KP
              </label>
              <Field
                className="border-solid border-2 border-gray-300 w-full rounded-lg"
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
                  className="border-solid border-2 border-gray-300 w-full rounded-lg"
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
                  className="border-solid border-2 border-gray-300 w-full rounded-lg"
                  id="type"
                  name="type"
                />
                <ErrorMessage name='type' />
              </div>
            </div>

            <div className="flex flex-col p-4 w-full">
              <label htmlFor="purpose" className="pb-4">
                Primary purpose of KP
              </label>
              <Field
                className="border-solid border-2 border-gray-300 w-full rounded-lg"
                id="purpose"
                name="purpose"
              />
              <ErrorMessage name='purpose' />
            </div>

            <div className="flex felx-row w-full">
              <div className="flex flex-col p-4 w-2/5">
                <label htmlFor="language" className="pb-4">
                  Language of KP
                </label>
                <Field
                  className="border-solid border-2 border-gray-300 w-full rounded-lg"
                  id="language"
                  name="language"
                />
                <ErrorMessage name='language' />
              </div>

              <div className="flex flex-col p-4 w-3/5">
                <label htmlFor="audience" className="pb-4">
                  Target Audience
                </label>
                <Field
                  className="border-solid border-2 border-gray-300 w-full rounded-lg"
                  id="audience"
                  name="audience"
                />
                <ErrorMessage name='audience' />
              </div>
            </div>

            <div className='flex w-full justify-center pt-16'>
              <button className='py-2 px-6 bg-gray-300 rounded-xl shadow-xl' type="submit"> Submit </button>
            </div>

            
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Knowledge_Products;
