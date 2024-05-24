"use client";

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../components/FormField";
import Button from "../../components/Button";
import axios from 'axios';

interface FormValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string | number;
  confirm_password: string | number;
}

function Register() {
  const initialValues: FormValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: ""
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required("Required"),
    last_name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
    confirm_password: Yup.string().oneOf([Yup.ref('password'), ''], 'Passwords must match').required("Required"),
  });

  const handleSubmit = async (values, actions) => {
    console.log("User info: ", values);
    
    try {
      const response = await axios.post('http://localhost:8080/api/register', values);
      console.log('User saved to db:', response.data);
      actions.resetForm();
      actions.setSubmitting(false);
    }
    catch (error) {
      console.error('Error saving user:', error);
      actions.setSubmitting(false);
    }
  }

  return (
    <div className="pt-40 w-full flex flex-col items-center">
      <h1 className="text-5xl pb-16">Register</h1>

      <div className="bg-white w-1/3 text-xl p-4">

        <Formik
          initialValues={initialValues}

          validationSchema={validationSchema}

          onSubmit={handleSubmit}

        >
          {
            formikProps => {
              return (
                <Form>
                  <FormField
                    label='First Name'
                    name='first_name'
                    placeholder='First Name'
                  />
                  <FormField
                    label='Last Name'
                    name='last_name'
                    placeholder='Last Name'
                  />
                  <FormField
                    label='Email'
                    name='email'
                    type='email'
                    placeholder='Email'
                  />

                  <FormField
                    label='Password'
                    name='password'
                    type='password'
                    
                  />

                  <FormField
                    label='Confirm Password'
                    name='confirm_password'
                    type='password'
                    
                  />
                  <Button />

                </Form>
              );
            }
          }

        </Formik>
      </div>
    </div>
  );
}

export default Register;
