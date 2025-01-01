"use client";

import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../components/FormField";
import Button from "../../components/submitButton";
import DataForms from "../../components/DataForms";
import { programs } from "../../helpers/globalOptions";
import { useFormContext } from '../../contexts/FormContext';

//Define types for form values
interface FormValues {
  program_name: string;
  data_forms: string[];
}

const data_forms: string[] = [
  "Child Vaccination",
  "Antenatal Care Assessment",
  "Postnatal Care Assessment",
];



const validationSchema = Yup.object({
  program_name: Yup.string().required("Required"),
  data_forms: Yup.array().min(1, "At least one form is required").required("Required"),
});



function ReportingSurvey() {

  const { selectedProgram, setSelectedProgram } = useFormContext();
  const [formValues, setFormValues] = useState<FormValues | null>(null);
  const [renderSurvey, setRenderSurvey] = useState(true);

  const initialValues: FormValues = {
    program_name: selectedProgram || localStorage.getItem('programSelection'),
    data_forms: JSON.parse(localStorage.getItem('formSelections')) || [],
  };


  const handleSubmit = async (values) => {

    try {
      setFormValues(values.data_forms);
      localStorage.setItem('formSelections', JSON.stringify(values.data_forms)); //save user's selections to local storage
      localStorage.setItem('programSelection', values.program_name);
      setRenderSurvey(false);
    }
    catch (error) {
      console.error('Error saving selections:', error);

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
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, status, setFieldValue }) => {


                  return (
                    <Form className="flex flex-wrap text-2xl">
                      <FormField
                        label="Select program:"
                        name="program_name"
                        id="program_name"
                        as="select"
                        options={programs}
                        onChange={(e) => {
                          const selectedValue = e.target.value;
                          setSelectedProgram(selectedValue);
                          setFieldValue('program_name', selectedValue);
                        }}
                      />

                      <FormField
                        label="Select applicable reporting form(s):"
                        as="checkbox"
                        id="data_forms"
                        name="data_forms"
                        options={data_forms}
                        setFieldValue={setFieldValue}
                      />


                      <Button isSubmitting={isSubmitting} status={status} text={"Start"} />
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

export default ReportingSurvey;
