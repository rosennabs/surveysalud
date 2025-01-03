
import React, { useEffect } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import FormField from "./FormField";
import Button from "./submitButton";
import axiosInstance from '../helpers/axiosInstance';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { antenatalSurvey, AntenatalSurveyValues, antenatalSurveyValidationSchema } from "../helpers/antenatalSurvey";


const validationSchema = antenatalSurveyValidationSchema;


function Antenatal() {


  const router = useRouter();

  const { isAuthenticated, user, loading } = useAuth();


  const initialValues: AntenatalSurveyValues = {
    age: "",
    gestationalAge: 0,
    numberOfCheckups: 0,
    accessibilityCare: "",
    antenatalSupplements: "", 
    vaccinationsReceived: [],
    screeningTests: [],
    healthEducationReceived: "",
    satisfactionCare: "",
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
      
      const response = await axiosInstance.post('http://localhost:8080/api/antenatal_survey', valuesWithUser);
      console.log("Antenatal Responses saved to db: ", response);
      

      actions.resetForm();
      actions.setSubmitting(false);
    }
    catch (error) {
      console.error('Error saving data:', error);

      // Display an error message to the user
      actions.setStatus({ error: 'An error occurred while submitting data!' });
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
          onSubmit={(values, actions) => {
            console.log("Formik onSubmit triggered"); // Debug log
            handleSubmit(values, actions);
          }}
        >
          {({ isSubmitting, status }) => {
            return (
              <Form className="flex flex-wrap text-2xl justify-center">
                <div>
                  {antenatalSurvey.map((question) => {
                    
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
