
import React, { useEffect } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import FormField from "./FormField";
import Button from "./submitButton";
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { useFormContext } from '../contexts/FormContext';
import { childVaccinationSurvey, childVaccinationValidationSchema, ChildVaccinationValues } from "../helpers/childVaccination";


const validationSchema = childVaccinationValidationSchema;


function ChildVaccination() {


  const router = useRouter();

  const { isAuthenticated, loading } = useAuth();
  const { handleSubmit } = useFormContext();


  const initialValues: ChildVaccinationValues = {
    age: "",
    bcgVaccine: "",
    opvVaccine: "",
    dptVaccine: "",
    measlesVaccine: "",
    reasonForMissingVaccinations: "",
    other_reasons: "",
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


  return (
    <div className="w-full flex flex-col items-center">

      <div className="flex flex-col items-center justify-center bg-light-teal py-16 px-28 w-full shadow-xl">
        <h1 className="text-3xl pb-16">Child Vaccination</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}

          onSubmit={(values: ChildVaccinationValues, actions: FormikHelpers<ChildVaccinationValues>) => {
            handleSubmit(values, actions, "child_vaccination");
          }}
        >
          {({ isSubmitting, values, status }) => {
            return (
              <Form className="flex flex-col text-2xl justify-center w-full">
                <div>
                  {childVaccinationSurvey.map((question) => {
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

export default ChildVaccination;
