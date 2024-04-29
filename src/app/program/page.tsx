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
  current_phase: string;
  fiscal_year: string;
  quarter: string;
  end_date: number | string;
}

const current_phase: string[] = [
  "Planning",
  "Implementation",
  "Evaluation",
  "Knowledge sharing",
  "Closure",
];

const fiscal_year: string[] = ["2022 - 2023", "2023 - 2024"];
const quarter: string[] = ["Q1", "Q2", "Q3", "Q4"];

const initialValues: FormValues = {
  program: "",
  current_phase: "",
  fiscal_year: "",
  quarter: "",
  end_date: "",
 
};

const validationSchema = Yup.object({
  program: Yup.string().required("Required"),
  current_phase: Yup.string().required("Required"),
  fiscal_year: Yup.string().required("Required"),
  quarter: Yup.string().required("Required"),
  end_date: Yup.string().required("Required"),
});

function Program() {
  return (
    <div className=" w-full pt-40 flex flex-col items-center">
      <h1 className="text-5xl pb-16">Program Portfolio</h1>

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
          {({ isSubmitting, values }) => {
            return (
              <Form className="flex flex-wrap text-2xl">
                <FormField
                  label="Program Name"
                  name="program"
                  id="program"
                  as="select"
                  options={programs}
                />
                

                <div className="flex flex-row w-full">
                  <FormField
                    label="Current phase"
                    as="select"
                    id="current_phase"
                    name="current_phase"
                    options={current_phase}
                  />

                  <FormField
                    label="Expected end date of program"
                    id="end_date"
                    name="end_date"
                    type="date"
                  />

                  
                </div>

                <FormField
                  label="Which fiscal year was the program launched?"
                  as="select"
                  id="fiscal_year"
                  name="fiscal_year"
                  options={fiscal_year}
                />

                <FormField
                  label="Which quarter was the program launched?"
                  as="select"
                  id="quarter"
                  name="quarter"
                  options={quarter}
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

export default Program;
