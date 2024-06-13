"use client";

import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../components/FormField";
import Button from "../../components/submitButton";
import { programs } from "../../helpers/globalOptions";
import axiosInstance from '../../helpers/axiosInstance';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { useFormContext } from '../../contexts/FormContext';

//Define types for form values
interface FormValues {
  program: string;
  title: string;
  date: number | string;
  type: string;
  language: string;
  other_languages: string;
  audience: string;
  purpose: string;
  comments: string;
}

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



const validationSchema = Yup.object({
  program: Yup.string().required("Required"),
  title: Yup.string()
    .min(5, "Too short!")
    .max(70, "Too long!")
    .required("Required"),
  date: Yup.string().required("Required"),
  type: Yup.string().required("Required"),
  language: Yup.string().required("Required"),
  other_languages: Yup.string().when("language", {
    is: (value: string) => value === "Others",
    then: () => Yup.string().required("Required"),
  }),
  audience: Yup.string().required("Required"),
  purpose: Yup.string().required("Required"),
});




function Knowledge_Products() {


  const router = useRouter();

  const { isAuthenticated, user, loading } = useAuth();
  const { selectedProgram, setSelectedProgram } = useFormContext();


  const initialValues: FormValues = {
    program: selectedProgram || "",
    title: "",
    date: "",
    type: "",
    language: "",
    other_languages: "",
    audience: "",
    purpose: "",
    comments: "",
  };

  useEffect(() => {
    if (!loading && !isAuthenticated) { // Check loading state before redirecting
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

    try {

      if (!user) {
        throw new Error('User not found');
      }

      // Include the user's email in the values object
      const valuesWithUser = {
        ...values,
        reported_by: user.email,
      };


      const response = await axiosInstance.post('http://localhost:8080/api/knowledge_product', valuesWithUser);

      actions.resetForm();
      actions.setSubmitting(false);
    }
    catch (error) {
      console.error('Error saving KP:', error);

      // Display an error message to the user
      actions.setStatus({ error: 'An error occurred while saving data!' });
      actions.setSubmitting(false);
    }

  };

  return (
    <div className=" w-full pt-40 flex flex-col items-center">
      <h1 className="text-5xl pb-16">Knowledge Products</h1>

      <div className="flex flex-col items-center justify-center bg-green-200 p-16 w-5/6 shadow-xl rounded-xl">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, values, status }) => {
            return (
              <Form className="flex flex-wrap text-2xl">
                <FormField
                  label="Program"
                  name="program"
                  id="program"
                  as="select"
                  options={programs}

                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    setSelectedProgram(selectedValue);
                    setFieldValue('program', selectedValue);
                  }}
                />
                <FormField
                  label="Title of KP"
                  id="title"
                  name="title"
                  placeholder="Add a title here"
                />

                <div className="flex flex-row w-full">
                  <FormField
                    label="Publication date of KP"
                    id="date"
                    name="date"
                    type="date"
                  />
                  <FormField
                    label="Type of KP"
                    as="select"
                    id="type"
                    name="type"
                    options={kp_types}
                  />
                </div>

                <FormField
                  label="Primary purpose of KP"
                  as="select"
                  id="purpose"
                  name="purpose"
                  options={kp_purpose}
                />

                <div className="flex w-full">
                  <FormField
                    label="Language of KP"
                    as="select"
                    id="language"
                    name="language"
                    options={languages}
                  />

                  {values.language === "Others" && (
                    <FormField
                      label="Other languages"
                      id="other_languages"
                      name="other_languages"
                      placeholder="Please specify"
                    />
                  )}

                  <FormField
                    label="Target Audience"
                    as="select"
                    id="audience"
                    name="audience"
                    options={kp_audience}
                  />
                </div>

                <FormField
                  label="Comments (if any)"
                  as="textarea"
                  id="comments"
                  name="comments"
                  wrap="soft"
                  rows="6"
                  placeholder="Add any additional notes here"
                />

                <Button isSubmitting={isSubmitting} status={status} />
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default Knowledge_Products;
