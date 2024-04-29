"use client";

import React from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import FormField from "../../components/FormField";
import Button from "../../components/Button";
import { programs } from "@/helpers/globalOptions";

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

const initialValues: FormValues = {
  program: "",
  fullname: "",
  organization: "",
  primary_perspective: "",
  engagement_activities: [
    {
      engagement_date: "",
      engagement_method: "",
      hours_spent: "",
      dollar_gifted: "",
    }
  ],

  comments: "",
};

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
        .test(
          "two-decimal-places",
          "Invalid dollar amount format",
          (value) => /^\d+(\.\d{1,2})?$/.test(value)
        ),
    })
  )
 
});

function Relationships() {
  return (
    <div className=" w-full pt-40 flex flex-col items-center">
      <h1 className="text-5xl pb-16">Relationship building</h1>

      <div className="flex flex-col items-center justify-center bg-green-200 p-16 w-5/6 shadow-xl rounded-xl">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            console.log("Submitted values: ", values);

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

                <FormField
                  label="Organization/Affiliation"
                  id="organization"
                  name="organization"
                  placeholder="Name of organization/affiliation"
                />

                <FormField
                  label="Primary perspective individual brings"
                  as="select"
                  id="primary_perspective"
                  name="primary_perspective"
                  options={primary_perspective}
                />

                <h3 className="text-2xl font-bold underline underline-offset-8 mt-12">
                  Engagement Activities :
                </h3>

                <table className="table-fixed text-lg  mt-12">
                  <thead>
                    <tr>
                      <th>Date individual was engaged</th>
                      <th>Method of engagement</th>
                      <th>Hours spent</th>
                      <th>Remuneration ($)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <FormField
                          id="date"
                          name="engagement_activities[0].engagement_date"
                          type="date"
                        />
                      </td>

                      <td>
                        <FormField
                          as="select"
                          id="engagement_method"
                          name="engagement_activities[0].engagement_method"
                         
                          options={engagement_method}
                        />
                      </td>
                      <td>
                        <FormField
                          type="number"
                          id="hours_spent"
                          name="engagement_activities[0].hours_spent"
                        />
                      </td>
                      <td>
                        <FormField
                          type="number"
                          step="0.01"
                          id="dollar_gifted"
                          name="engagement_activities[0].dollar_gifted"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>

                <Button isSubmitting={isSubmitting} />
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default Relationships;
