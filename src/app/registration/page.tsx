"use client";

import React from "react";
import { Formik, Form } from "formik";
import { useRouter } from 'next/navigation';
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

  const router = useRouter(); // Use useRouter from next/router

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

    try {
      const response = await axios.post('http://localhost:8080/api/user/register', values);

      actions.resetForm();
      actions.setSubmitting(false);
      router.push("/login")
    }
    catch (error) {
      console.error('Error registering user:', error);

      if (error.response && error.response.data && error.response.data.error === "User already exists!") {
        // Display an error message to the user
        actions.setStatus({ error: 'User already exists! Please login.' });
      }
      else {
        actions.setStatus({ error: 'An error occurred while registering user. Please try again later.' });
      }
      actions.setSubmitting(false);
    }
  };


  return (
    <div className="pt-40 w-full flex flex-col items-center">
      <h1 className="text-5xl pb-16">Register</h1>

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
                <Button status={status} />

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
