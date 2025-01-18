"use client";

import React from "react";
import { Formik, Form } from "formik";
import { useRouter } from 'next/navigation';
import * as Yup from "yup";
import FormField from "../../components/FormField";
import Button from "../../components/submitButton";
import axios from 'axios';

interface FormValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string | number;
  confirm_password: string | number;
}

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


function Register() {

  const router = useRouter(); // Use useRouter from next/router


  const handleSubmit = async (values, actions) => {

    try {
      const response = await axios.post('http://localhost:8080/api/user/register', values);

      actions.resetForm();
      actions.setSubmitting(false);
      router.push("/login");
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
    <div className=" flex h-screen items-center bg-gradient-to-b from-amber-500 via-amber-200 to-white">

      <img
        src="/nutrition.jpg"
        alt="Image of food"
        className="w-1/2 h-full object-cover"
      />
      <div className="w-1/2 text-xl p-8">

        <Formik
          initialValues={initialValues}

          validationSchema={validationSchema}

          onSubmit={handleSubmit}

        >
          {({ status }) => {
            return (
              <Form>
                <h2 className="flex justify-center pb-16 mt-8">Create an account</h2>


                <div className="flex">

                  <FormField
                    label='First name'
                    name='first_name'
                    placeholder='First Name'
                  />
                  <FormField
                    label='Last name'
                    name='last_name'
                    placeholder='Last Name'
                  />
                </div>

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
                <Button status={status} text={"Sign up"} />

                <div className="flex gap-4 justify-center">
                  <span>Already have an account ?</span>
                  <a href="/login" className="text-blue-500 underline underline-offset-8">Login here</a>

                </div>
                
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
