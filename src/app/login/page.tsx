"use client";

import React from "react";
import { useRouter } from 'next/navigation';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../components/FormField";
import Button from "../../components/submitButton";
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';


interface FormValues {
  email: string;
  password: string | number;
}

const initialValues: FormValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string().required("Required"),
});




function Login() {
  const router = useRouter(); // Use useRouter from next/router
  const { login } = useAuth();

  const handleSubmit = async (values, actions) => {

    try {
      const response = await axios.post('http://localhost:8080/api/user/login', values);

      // Fetch the user's token
      const { token, user } = response.data;
      login(user, token);

      actions.resetForm();
      actions.setSubmitting(false);
      router.push('/'); //Navigate to the homepage
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
  };

  return (
    <div className="mt-32 w-full flex flex-col items-center">
      
      <div className="bg-off-white border border-black border-opacity-15 w-[500px] text-xl p-8">

        <Formik
          initialValues={initialValues}

          validationSchema={validationSchema}

          onSubmit={handleSubmit}

        >
          {({ status }) => {
            return (
              <Form>
                <div>
                  <h2 className="flex justify-center pb-8 mt-8">Log in</h2>
                </div> 

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

                <Button status={status} text={"Sign in"}/>

                <div className="flex justify-center">
                  <a className="font-medium underline underline-offset-4" href="">Forgot password?</a>
                  <span className="px-4">|</span>
                  <a className="font-medium underline underline-offset-4" href="/registration">Create an account</a>
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

export default Login;
