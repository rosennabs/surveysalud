"use client";

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../components/FormField";
import Button from "../../components/Button";

interface FormValues {
  email: string;
  password: string | number;
}

function Login() {
  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });

  return (
    <div className="pt-40 w-full flex flex-col items-center">
      <h1 className="text-5xl pb-16">Login</h1>

      <div className="bg-white w-1/3 text-xl p-4">

      <Formik
        initialValues={initialValues}

        validationSchema={validationSchema}

        onSubmit={(values, action) => {
          console.log("Form values: ", values);
          action.resetForm();
          action.setSubmitting(false);
        }}
        
      >
        {
          formikProps => {
            return (
              <Form>
                <FormField
                  label='Email'
                  name='email'
                  type='email'
                />

                <FormField
                  label='Password'
                  name='password'
                  type='password'
                />

                <Button />

              </Form>
            )
          }
        }
        
        </Formik>
      </div>
    </div>
  );
}

export default Login;
