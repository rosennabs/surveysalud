import React from "react";
import { useRouter } from 'next/navigation';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../components/FormField";



const button = "bg-teal-100 px-4 py-1 rounded-lg"

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
    <div className="ml-32">
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
      >
        {({ }) => {
          return (
            <Form>
              <FormField
                name='subject'
                placeholder="Subject"
              />
              <FormField
                name='message'
                as="textarea"
                wrap="soft"
                rows="3"
                placeholder="Type your message here"
              />
              <div className="flex flex-row justify-between">
                <button className={button} type="submit">Cancel</button>
                <button className={button} type="reset">Send</button>
              </div>
             
              
            </Form>
          );
          
        }}

      </Formik>
    </div>
  )
}

export default Contact;