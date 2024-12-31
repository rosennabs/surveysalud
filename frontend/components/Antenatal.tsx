
import React, { useEffect } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import FormField from "./FormField";
import Button from "./submitButton";
import { programs } from "../helpers/globalOptions";
import axiosInstance from '../helpers/axiosInstance';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { useFormContext } from '../contexts/FormContext';
import { antenatalSurvey, antenatalSurveyValidationSchema } from "../helpers/antenatalSurvey";


interface AntenatalSurveyValues {
  age: string;
  gestationalAge: number;
  numberOfCheckups: number;
  timingFirstCheckup: string;
  locationCheckups: string[];
  other_locationCheckups: string;
  accessibilityCare: string;
  travelTime: string;
  antenatalSupplements: string;
  nutritionCounseling: string;
  dietaryIntake: string;
  vaccinationsReceived: string[];
  screeningTests: string[];
  healthEducationReceived: string;
  topicsCovered: string[];
  other_topicsCovered: string;
  satisfactionCare: string;
  areasImprovement: string;
  additionalComments: string;
}


const validationSchema = antenatalSurveyValidationSchema;


function Antenatal() {


  const router = useRouter();

  const { isAuthenticated, user, loading } = useAuth();
  //const { selectedProgram, setSelectedProgram } = useFormContext();


  const initialValues: AntenatalSurveyValues = {
    age: "",
    gestationalAge: 0,
    numberOfCheckups: 0,
    timingFirstCheckup: "",
    locationCheckups: [],
    other_locationCheckups: "",
    accessibilityCare: "",
    travelTime: "",
    antenatalSupplements: "",
    nutritionCounseling: "",
    dietaryIntake: "",
    vaccinationsReceived: [],
    screeningTests: [],
    healthEducationReceived: "",
    topicsCovered: [],
    other_topicsCovered: "",
    satisfactionCare: "",
    areasImprovement: "",
    additionalComments: "",
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

  const handleSubmit = async (values: AntenatalSurveyValues, actions: FormikHelpers<AntenatalSurveyValues>) => {

    try {

      if (!user) {
        throw new Error('User not found');
      }

      // Include the user's email in the values object
      const valuesWithUser = {
        ...values,
        reported_by: `${user.first_name} ${user.last_name}`,
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
    <div className=" w-full flex flex-col items-center">


      <div className="flex flex-col items-center justify-center  bg-light-teal p-16 w-full shadow-xl">
        <h1 className="text-3xl pb-16">Antenatal Care Assessment</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, values, status }) => {
            return (
              <Form className="flex flex-wrap text-2xl">
                <div>
                  {antenatalSurvey.map((question) => {
                    //Handle conditional rendering
                    if (question.conditional) {
                      // Destructure and assign the field and value properties to a variable condField and condValue
                      const { field: condField, value: condValue } = question.conditional;
                      // if the form value of condField eg. locationCheckups does not include 'Other [Please Specify]'
                      if (!values[condField].includes(condValue)) {
                        return null; //Don't render this field
                      }
                    }

                    return (

                    <FormField
                      key={question.id}
                      label={question.label}
                      id={question.id}
                      name={question.name}
                      placeholder={question.placeholder}
                      options={question.options}
                      type={question.type}
                      as={question.as}
                      />
                    )


                  })}
                </div>
                
                {/* <FormField
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
                /> */}
                
                
                <Button isSubmitting={isSubmitting} status={status} text={"Submit"} />
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default Antenatal;
