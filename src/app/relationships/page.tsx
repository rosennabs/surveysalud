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
    },
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
        .test("two-decimal-places", "Invalid dollar amount format", (value) =>
          /^\d+(\.\d{1,2})?$/.test(value)
        ),
    })
  ),
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
            const { isSubmitting, values } = formikProps;

            return (
              <Form className="flex flex-wrap text-2xl">
                <FormField
                  label="Program"
                  name="program"
                  as="select"
                  options={programs}
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

                <h3 className="text-2xl font-bold underline underline-offset-8 mt-12">
                  Engagement Activities :
                </h3>

                <FieldArray name="engagement_activities">
                  {({ push, remove }) => {
                    return (
                      <div>
                        {values.engagement_activities.map(
                          (engagement, index) => (
                            <div
                              key={index}
                              className="flex items-center w-full"
                            >
                              <div>
                                <FormField
                                  label="Date individual was engaged"
                                  name={`engagement_activities[${index}].engagement_date`}
                                  type="date"
                                />
                              </div>

                              <div>
                                <FormField
                                  label="Method of engagement"
                                  as="select"
                                  name={`engagement_activities[${index}].engagement_method`}
                                  options={engagement_method}
                                />
                              </div>

                              <div>
                                <FormField
                                  label="Hours spent"
                                  type="number"
                                  name={`engagement_activities[${index}].hours_spent`}
                                />
                              </div>

                              <div>
                                <FormField
                                  label="Remuneration ($)"
                                  type="number"
                                  step="0.01"
                                  name={`engagement_activities[${index}].dollar_gifted`}
                                />
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    );
                  }}
                </FieldArray>

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
