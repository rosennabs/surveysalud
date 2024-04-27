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
  fullname: string;
  gender: string;
  organization: string;
  occupation: string;
  province: string;
}

const gender: string[] = ["Man", "Woman", "Others"];

const occupation: string[] = [
  "Manager",
  "Analyst",
  "Physician",
  "Consultant",
  "Student",
  "Healthcare worker",
  "Pharmacist",
];

const province: string[] = [
  "Quebec",
  "British Columbia",
  "Alberta",
  "Manitoba",
  "Nova Scotia",
  "Saskatchewan",
  "Newfoundland and Labrador",
  "New Brunswick",
  "Prince Edward Island",
  "Northwest Territories",
  "Yukon",
  "Nunavut",
];

const initialValues: FormValues = {
  program: "",
  fullname: "",
  gender: "",
  organization: "",
  occupation: "",
  province: ""
};

const validationSchema = Yup.object({
  program: Yup.string().required("Required"),
  fullname: Yup.string()
    .min(5, "Too short!")
    .max(70, "Too long!")
    .required("Required"),
  gender: Yup.string().required("Required"),
  organization: Yup.string().required("Required"),
  province: Yup.string().required("Required"),
});

function Clientele() {
  return (
    <div className=" w-full pt-40 flex flex-col items-center">
      <h1 className="text-5xl pb-16">Clients Reach</h1>

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
                  label="Full name of individual"
                  id="fullname"
                  name="fullname"
                  placeholder="First and Last name"
                />

                <div className="flex flex-row w-full">
                  <FormField
                    label="Gender"
                    as="select"
                    id="gender"
                    name="gender"
                    options={gender}

                  />

                  <FormField
                    label="Region"
                    as="select"
                    id="province"
                    name="province"
                    options={province}
                  />
                  
                </div>

                <FormField
                  label="Organization/Affiliation"

                  id="organization"
                  name="organization"

                />

                <FormField
                  label="Occupation"
                  as="select"
                  id="occupation"
                  name="occupation"
                  options={occupation}
                />

                  <FormField
                    label="Comments (if any)"
                    as="textarea"
                    id="comments"
                    name="comments"
                    wrap="soft"
                    rows="6"
                    placeholder="Add any additional notes here"
                  />

                  <Button isSubmitting={isSubmitting} />
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default Clientele;
