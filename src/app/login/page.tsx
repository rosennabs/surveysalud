"use client";

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../components/FormField";
import Button from "../../components/Button";
import axios from 'axios';

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


  const handleSubmit = async (values, actions) => {
    try {
      const response = await axios.post('http://localhost:8080/api/user/login', values);
      
      actions.resetForm();
      actions.setSubmitting(false);
    }
    catch (error) {
      console.error('Error logging in user:', error);
      
      if (error.response && error.response.data && error.response.data.error === "Invalid email or password") {
        // Display an error message to the user
        actions.setStatus({ error: 'Invalid email or password' });
      }
      else {
        actions.setStatus({ error: 'An error occurred, please try again later!' });
      }
      actions.setSubmitting(false);
    }
}
  

  return (
    <div className="pt-40 w-full flex flex-col items-center">
      <h1 className="text-5xl pb-16">Login</h1>

      <div className="bg-white w-1/3 text-xl p-4">

      <Formik
        initialValues={initialValues}

        validationSchema={validationSchema}

        onSubmit={handleSubmit}
        
      >
          {({ status }) => {
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

                <Button status={status}/>

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
