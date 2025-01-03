import * as Yup from 'yup';

// Survey Questions
export const childVaccinationSurvey = [
  {
    label: "What is the age of your child?",
    id: "age",
    name: "age",
    placeholder: "Select an option",
    options: ["Under 1", "1-2", "3-5", "5 and above"],
    as: "select"
  },
  {
    label: "Has your child received BCG?",
    id: "bcgVaccine",
    name: "bcgVaccine",
    options: ["Yes", "No"],
    as: "radio",
  },
  {
    label: "Has your child received OPV?",
    id: "opvVaccine",
    name: "opvVaccine",
    options: ["Yes", "No"],
    as: "radio",
  },
  {
    label: "Has your child received DPT?",
    id: "dptVaccine",
    name: "dptVaccine",
    options: ["Yes", "No"],
    as: "radio",
  },
  {
    label: "Has your child received Measles Vaccine?",
    id: "measlesVaccine",
    name: "measlesVaccine",
    options: ["Yes", "No"],
    as: "radio",
  },
  {
    label: "If missing any vaccinations, what is the main reason?",
    id: "reasonForMissingVaccinations",
    name: "reasonForMissingVaccinations",
    placeholder: "Select an option",
    options: ["Distance", "Cost", "Lack of Information", "Fear", "Child not of age", "Other"],
    as: "select",
  },
  // Conditional field for specifying "Other"
  {
    label: "Please specify other reason(s) for missing vaiccinations:",
    id: "other_reasons",
    name: "other_reasons",
    placeholder: "Provide reason",
    type: "text",
    conditional: {
      field: "reasonForMissingVaccinations",
      value: "Other",
    },
  },
];

// Type Definitions
export interface ChildVaccinationValues {
  age: string;
  bcgVaccine: string;
  opvVaccine: string;
  dptVaccine: string;
  measlesVaccine: string;
  reasonForMissingVaccinations: string;
  other_reasons: string;
}

// Validation Schema

export const childVaccinationValidationSchema = Yup.object({
  age: Yup.string().required("Required"),
  bcgVaccine: Yup.string().required("Required"),
  opvVaccine: Yup.string().required("Required"),
  dptVaccine: Yup.string().required("Required"),
  measlesVaccine: Yup.string().required("Required"),
  reasonForMissingVaccinations: Yup.string().required("Required"),
  other_reasons: Yup.string().when("reasonForMissingVaccinations", {
    is: "Other", // Directly compare the value to "Other"
    then: (schema) => schema.required("Required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});