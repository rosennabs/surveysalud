'use client'

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

//Define types for form values
interface FormValues {
  program: string[];
  title: string;
  date: number | string;
  type: string[];
  language: string[];
  audience: string[];
  purpose: string[];
}

const program: string[] = [
  'Rural health care',
  'Leadership capacity building',
  'Indigenous services',
  'Long term care',
  'Primary care intervention'
];

const kp_type: string[] = [
  'Webinar',
  'Poster',
  'Article',
  'Blog'
];

const language: string[] = [
  'English',
  'French',
  'Both',
  'Others'
];

const kp_audience: string[] = [
  'Frontline workers',
  'Patients',
  'General public',
  'Caregivers'

];

const kp_purpose: string[] = [
  'Capacity building',
  'Information dissemination',
  'Public health campaign',
  'Health promotion'

];


const initialValues: FormValues = {
  program: [],
  title: '',
  date: '',
  type: [],
  language: [],
  audience: [],
  purpose: []
};

function Knowledge_Products() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen' >
      <h1 className='text-5xl'>Knowledge Products</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);

        }}
      >
        <Form className='flex flex-col items-center justify-center'>
          <div>
            <label htmlFor='program'>Program:</label>
            <Field id='program' name='program' />
          </div>
          
          <div>
            <label htmlFor='title'>Title of KP</label>
            <Field id='title' name='title' />
          </div>
          
          <div>
            <label htmlFor='date'>Publication date of KP</label>
            <Field id='date' name='date' />
          </div>
          
          <div>
            <label htmlFor='kp_type'>Type of KP</label>
            <Field id='kp_type' name='kp_type' />
          </div>
          
          <div>
            <label htmlFor='language'>Language of KP</label>
            <Field id='language' name='language' />
          </div>

          <div>
            <label htmlFor='audience'>Target Audience</label>
            <Field id='audience' name='audience' />
          </div>
          
          <div>
            <label htmlFor='purpose'>Primary purpose of KP</label>
            <Field id='purpose' name='purpose' />
          </div>
         
          <button type='submit'> Submit </button>
          
        </Form>

      </Formik>
    </div>

  );
}

export default Knowledge_Products;
