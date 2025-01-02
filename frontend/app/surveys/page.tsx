"use client";

import React, { useState, useEffect } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import FormField from "../../components/FormField";
import Button from "../../components/submitButton";
import DataForms from "../../components/DataForms";

//Define types for form values
interface FormValues {
  data_forms: string[];
}

const data_forms: string[] = [
  "Child Vaccination",
  "Child Nutrition",
  "Antenatal Care Assessment",
  "Postnatal Care Assessment",
];



const validationSchema = Yup.object({
  data_forms: Yup.array().min(1, "At least one form is required").required("Required"),
});



function Surveys() {
  const [formValues, setFormValues] = useState<string[]>([]);
  const [renderSurvey, setRenderSurvey] = useState(true);

  // Load data from localStorage only after the component has mounted in the browser.
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSelections = JSON.parse(localStorage.getItem("formSelections") || "[]");
      setFormValues(savedSelections); // Retain user's selection when the component rerenders
    }
  }, []);


  const handleSubmit = async (values: FormValues) => {
    try {
      setFormValues(values.data_forms);
      localStorage.setItem("formSelections", JSON.stringify(values.data_forms)); // Set form values to local storage
      setRenderSurvey(false);
    } catch (error) {
      console.error("Error saving selections:", error);
    }
  };

  const handleAddForm = () => {
    setRenderSurvey(true);
  };
 
  
  return (
    <>
      {renderSurvey ?
        (
          <div className="flex flex-col items-center justify-center m-32">


            <div className="bg-white border border-black border-opacity-15 p-16 shadow-xl w-[700px]">

              <Formik
                initialValues={{ data_forms: formValues }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, status, setFieldValue }: {
                  isSubmitting: boolean;
                  status?: string;
                  setFieldValue: FormikHelpers<FormValues>["setFieldValue"];
                }) => {

                  return (
                    <Form className="flex flex-col text-2xl">
                      <h4>Select applicable survey(s):</h4>
    
                      <FormField
                        label=""
                        as="checkbox"
                        id="data_forms"
                        name="data_forms"
                        options={data_forms}
                        setFieldValue={setFieldValue}
                      />


                      <Button isSubmitting={isSubmitting} status={status} text={"Enter"} />
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        ) : (
          formValues && <DataForms data_forms={formValues} handleAddForm={handleAddForm} />
        )
      }
    </>
  );


}

export default Surveys;
