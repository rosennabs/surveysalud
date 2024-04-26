"use client";

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../components/FormField";
import Button from "../../components/Button";
import { programs } from "@/helpers/globalOptions";

//Define types for form values
interface FormValues {
  program: string;
  title: string;
  date: number | string;
  type: string;
  language: string;
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

const initialValues: FormValues = {
  program: "",
  title: "",
  date: "",
  type: "",
  language: "",
  audience: "",
  purpose: "",
  comments: "",
};

const validationSchema = Yup.object({
  program: Yup.string().required("Required"),
  title: Yup.string()
    .min(5, "Too short!")
    .max(70, "Too long!")
    .required("Required"),
  date: Yup.string().required("Required"),
  type: Yup.string().required("Required"),
  language: Yup.string().required("Required"),
  audience: Yup.string().required("Required"),
  purpose: Yup.string().required("Required"),
});

function Knowledge_Products() {
  return (
    <div className=" w-full pt-40 flex flex-col items-center">
      <h1 className="text-5xl pb-16">Knowledge Products</h1>

      <div className="flex flex-col items-center justify-center bg-green-200 p-16 w-5/6 shadow-xl rounded-xl">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}

          onSubmit={(values, actions) => {
            // console.log("Submitted values: ", values);
            
              actions.resetForm();
              actions.setSubmitting(false);

          }}
        >
          {(formikProps) => {
            //console.log(formikProps);
            const { isSubmitting } = formikProps;

            return (
              <Form className="flex flex-wrap text-2xl">
                <FormField
                  label="Program"
                  name="program"
                  id="program"
                  as="select"
                  options={programs}
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

                <div className="flex felx-row w-full">
                  <FormField
                    label="Language of KP"
                    as="select"
                    id="language"
                    name="language"
                    options={languages}
                  />

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


                 <Button isSubmitting={isSubmitting}/>
            
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default Knowledge_Products;
