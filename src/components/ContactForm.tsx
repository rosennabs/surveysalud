import React from "react";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../components/FormField";

const button = "bg-teal-100 px-4 py-1 rounded-lg";

interface FormValues {
  subject: string | number;
  message: string | number;
}

const initialValues: FormValues = {
  subject: "",
  message: "",
};

const validationSchema = Yup.object({
  subject: Yup.string().required("Required"),
});

function Contact() {
  return (
    <div className="relative">
      <div className="">
        <img className="w-full" src="/contact.svg" alt="a trapezium" />
      </div>

      <div className="flex absolute inset-0 items-center text-white z-10">
        <h2 className="ml-32">Contact us</h2>

        <div className="text-black montserrat-regular w-1/2 ml-64 p-16">
          <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
          >
            {({}) => {
              return (
                <Form>
                  <FormField name="subject" placeholder="Subject" />
                  <FormField
                    name="message"
                    as="textarea"
                    wrap="soft"
                    rows="3"
                    placeholder="Type your message here"
                  />
                  <div className="flex flex-row justify-between">
                    <button className={button} type="submit">
                      Cancel
                    </button>
                    <button className={button} type="reset">
                      Send
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Contact;
