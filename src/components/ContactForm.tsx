import React from "react";
import { useRouter } from 'next/navigation';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import FormField from "../components/FormField";

interface FormValues {
  subject: string | number;
  message: string | number;
};

const initialValues: FormValues = {
  subject: "",
  message: ""
};

const validationSchema = Yup.object({
  subject: Yup.string().required("Required")
});


function Contact() {
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ values }) => {
          return (
            <Form>
              <FormField
                label='Subject'
                name='subject'
                placeholder="Subject"
              />
              <FormField
                name='message'
                as="textarea"
                wrap="soft"
                rows="5"
                placeholder="Type your message here"
              />
            </Form>
          );
          
        }}

      </Formik>
    </div>
  )
}

export default Contact;