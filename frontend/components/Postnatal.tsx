
import React, { useEffect } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import FormField from "./FormField";
import Button from "./submitButton";
import axiosInstance from '../helpers/axiosInstance';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { useFormContext } from '../contexts/FormContext';
import { postnatalSurvey, PostnatalSurveyValues, postnatalValidationSchema } from "../helpers/postnatalSurvey";


const validationSchema = postnatalValidationSchema;


function Postnatal() {


  const router = useRouter();

  const { isAuthenticated, user, loading } = useAuth();
  //const { selectedProgram, setSelectedProgram } = useFormContext();


  const initialValues: PostnatalSurveyValues = {
    age: "",
    receivedPostnatalCheckups: "",
    numberOfPostnatalVisits: 0,
    experiencedComplications: "",
    receivedBreastfeedingSupport: "",
    receivedMentalHealthSupport: "",
    providedNewbornCareInfo: "",
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

  const handleSubmit = async (values: PostnatalSurveyValues, actions: FormikHelpers<PostnatalSurveyValues>) => {

    try {

      if (!user) {
        throw new Error('User not found');
      }

      // Include the user's email in the values object
      const valuesWithUser = {
        ...values,
        reported_by: `${user.first_name} ${user.last_name}`,
      };


      const response = await axiosInstance.post('http://localhost:8080/api/postnatal_survey', valuesWithUser);
      //console.log("Postnatal Survey Responses: ", response.data);
      

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
        <h1 className="text-3xl pb-16">Postnatal Care Assessment</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, values, status }) => {
            return (
              <Form className="flex flex-wrap text-2xl justify-center">
                <div>
                  {postnatalSurvey.map((question) => {
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
                    );


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

export default Postnatal;
