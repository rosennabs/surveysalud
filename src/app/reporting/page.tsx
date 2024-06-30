"use client";

import React, { useState} from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../components/FormField";
import Button from "../../components/submitButton";
import DataForms from "../../components/DataForms";
import { programs } from "../../helpers/globalOptions";
import axios from 'axios';
import { useFormContext } from '../../contexts/FormContext';

//Define types for form values
interface FormValues {
  program_name: string;
  data_forms: string;
}

const data_forms: string[] = [
  "Program",
  "Knowledge Products",
  "Relationships",
  "Improvement Projects",
  "Healthcare Leaders",
  "Patient Reach",
  "Sustainability",
];



const validationSchema = Yup.object({
  program_name: Yup.string().required("Required"),
  data_forms: Yup.string().required("Required"),
});



function ReportingSurvey() {

  const { selectedProgram, setSelectedProgram } = useFormContext();
  const [formValues, setFormValues] = useState<FormValues | null>(null);
  const [renderSurvey, setRenderSurvey] = useState(true);

  const initialValues: FormValues = {
    program_name: selectedProgram || "",
    data_forms: "",
  };


  const handleSubmit = async (values) => {

    try {

      const response = await axios.post('http://localhost:8080/api/reporting', values);
      setFormValues(values);
      
      setRenderSurvey(false);
    }
    catch (error) {
      console.error('Error saving selections:', error);

    }
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
                {({ isSubmitting, status, setFieldValue}) => {


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
                        as="select"
                        id="data_forms"
                        name="data_forms"
                        options={data_forms}
                      />


                      <Button isSubmitting={isSubmitting} status={status} text={"Start"} />
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        ) : (
          formValues && <DataForms data_forms={formValues.data_forms}/>
        )
      }
    </>
  )


}

export default ReportingSurvey;
