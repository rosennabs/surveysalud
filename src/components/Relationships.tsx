"use client";

import React, { useEffect } from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import FormField from "./FormField";
import Button from "./submitButton";
import { programs } from "../helpers/globalOptions";
import axiosInstance from '../helpers/axiosInstance';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { useFormContext } from '../contexts/FormContext';

//Define types for form values
interface FormValues {
  program: string;
  fullname: string;
  organization: string;
  primary_perspective: string;
  engagement_activities: {
    engagement_date: string | number;
    engagement_method: string;
    hours_spent: string;
    dollar_gifted: string;
  }[];

  comments: string;
}

const primary_perspective: string[] = [
  "Indigenous perspective",
  "Patient perspective",
  "Leadership perspective",
  "Frontline worker perspective",
  "Caregiver perspective",
];

const engagement_method: string[] = [
  "Round table discussion",
  "Survey",
  "Advisory group",
  "Interview",
  "Workshops",
  "Focus group discussions",
];



const validationSchema = Yup.object({
  program: Yup.string().required("Required"),
  fullname: Yup.string()
    .min(5, "Too short!")
    .max(70, "Too long!")
    .required("Required"),
  organization: Yup.string().required("Required"),
  primary_perspective: Yup.string().required("Required"),
  engagement_activities: Yup.array().of(
    Yup.object().shape({
      engagement_date: Yup.string().required("Required"),
      engagement_method: Yup.string().required("Required"),
      hours_spent: Yup.number().required("Required"),
      dollar_gifted: Yup.string()
        .required("Required")
        .test("two-decimal-places", "Invalid dollar amount format", (value) =>
          /^\d+(\.\d{1,2})?$/.test(value)
        ),
    })
  ).required('Must have engagement activities').min(1, 'Minimum of 1 engagement activity'),
});



function Relationships() {

  const router = useRouter();

  const { isAuthenticated, user, loading } = useAuth();
  const { selectedProgram, setSelectedProgram } = useFormContext();


  const initialValues: FormValues = {
    program: selectedProgram || "",
    fullname: "",
    organization: "",
    primary_perspective: "",
    engagement_activities: [
      {
        engagement_date: "",
        engagement_method: "",
        hours_spent: "",
        dollar_gifted: "",
      },
    ],

    comments: "",
  };

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <div className="flex flex-col items-center pt-40">
      <h1 className="text-5xl">
        Loading...
      </h1></div>; // Render loading state
  }

  if (!isAuthenticated) {

    return null; // Render nothing if not authenticated
  }

  const handleSubmit = async (values, actions) => {
    // Disable the submit button
    actions.setSubmitting(true);

    try {

      if (!user) {
        throw new Error('User not found');
      }

      // Include the user's email in the values object
      const valuesWithUser = {
        ...values,
        reported_by: `${user.first_name} ${user.last_name}`,
      };

      // Send the form data to the server
      const response = await axiosInstance.post('http://localhost:8080/api/relationship', valuesWithUser);


      actions.resetForm();
      actions.setSubmitting(false);
    }
    catch (error) {
      console.error('Error saving relationship:', error);


      // Display an error message to the user
      actions.setStatus({ error: 'An error occurred while saving data!' });
      actions.setSubmitting(false);
    }
  };

  return (
    <div className=" w-full flex flex-col items-center">
  

      <div className="flex flex-col items-center justify-center bg-light-teal p-16 w-full shadow-xl">
        <h1 className="text-5xl pb-16">Relationship building</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status, setFieldValue }) => {

            return (
              <Form className="flex flex-wrap text-2xl">
                <FormField
                  label="Program"
                  name="program"
                  as="select"
                  options={programs}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    setSelectedProgram(selectedValue);
                    setFieldValue('program', selectedValue);
                  }}
                />

                <FormField
                  label="Full name of individual"
                  name="fullname"
                  placeholder="First and Last name"
                />

                <FormField
                  label="Organization/Affiliation"
                  name="organization"
                  placeholder="Name of organization/affiliation"
                />

                <FormField
                  label="Primary perspective individual brings"
                  as="select"
                  name="primary_perspective"
                  options={primary_perspective}
                />

                <div>
                  <h4 className="underline underline-offset-8 my-12">
                    Engagement Activities :
                  </h4>

                  <table className="table-fixed text-lg  mt-12">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Engagement Method</th>
                        <th>Hours Spent</th>
                        <th>Remuneration ($)</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      <FieldArray name="engagement_activities">
                        {({ push, remove, form }) => {
                          const { values } = form;

                          return (
                            <>
                              {values.engagement_activities.map(
                                (engagement, index) => (
                                  <tr
                                    key={index}

                                  >
                                    <td>
                                      <FormField
                                        name={`engagement_activities[${index}].engagement_date`}
                                        type="date"
                                      />
                                    </td>

                                    <td>
                                      <FormField
                                        as="select"
                                        name={`engagement_activities[${index}].engagement_method`}
                                        options={engagement_method}
                                      />
                                    </td>

                                    <td>
                                      <FormField
                                        type="number"
                                        name={`engagement_activities[${index}].hours_spent`}
                                      />
                                    </td>

                                    <td>
                                      <FormField
                                        type="number"
                                        step="0.01"
                                        name={`engagement_activities[${index}].dollar_gifted`}
                                      />
                                    </td>

                                    <td >
                                      <button
                                        className="py-2 px-6 h-12 bg-gray-300 rounded-xl shadow-xl"
                                        type="button"
                                        onClick={() => {
                                          remove(index);
                                        }}
                                      >
                                        Delete
                                      </button>
                                    </td>
                                  </tr>
                                )
                              )}
                              <tr>
                                <td colSpan="5" >
                                  <button
                                    className="mt-4 py-2 px-6 bg-gray-300 rounded-xl shadow-xl"
                                    type="button"
                                    onClick={() =>
                                      push({
                                        engagement_date: "",
                                        engagement_method: "",
                                        hours_spent: "",
                                        dollar_gifted: "",
                                      })
                                    }
                                  >
                                    Add Engagement Activity
                                  </button>
                                </td>
                              </tr>

                            </>
                          );
                        }}
                      </FieldArray>
                    </tbody>
                  </table>
                </div>

                <Button isSubmitting={isSubmitting} status={status} text={"Save"}/>


              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default Relationships;
