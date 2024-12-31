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
    <div className="pt-32 w-full flex flex-col items-center">


      <div className="bg-white border border-black border-opacity-15 w-[500px] text-xl p-8">

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
