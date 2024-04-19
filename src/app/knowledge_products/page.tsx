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
  program: program,
  title: '',
  date: 0,
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
        onSubmit={() => {

        }}
      >

      </Formik>
    </div>

  );
}

export default Knowledge_Products;
