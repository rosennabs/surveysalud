import * as Yup from 'yup';

export const postnatalSurvey = [
  {
    label: "What is your age?",
    id: "age",
    name: "age",
    placeholder: "Select an option",
    options: ["Under 18", "18 - 24", "25 - 34", "35 - 44", "45 and above"],
    as: "select"
  },
  {
    label: "Have you received postnatal checkups within 6 weeks of delivery?",
    id: "receivedPostnatalCheckups",
    name: "receivedPostnatalCheckups",
    options: ["Yes", "No"],
    as: "radio",
  },
  {
    label: "How many postnatal visits did you attend?",
    id: "numberOfPostnatalVisits",
    name: "numberOfPostnatalVisits",
    placeholder: "Enter number",
    type: "number",
    min: 0,
    max: 10,
    conditional: {
      field: "receivedPostnatalCheckups",
      value: "Yes",
    },
  },
  {
    label: "Have you experienced any complications after birth? (Excessive bleeding, infection, etc.)",
    id: "experiencedComplications",
    name: "experiencedComplications",
    options: ["Yes", "No"],
    as: "radio",
  },
  {
    label: "Has your newborn been examined by a healthcare worker since birth?",
    id: "newbornExamination",
    name: "newbornExamination",
    options: ["Yes", "No"],
    as: "radio",
  },

  {
    label: "Have you received breastfeeding support after delivery?",
    id: "receivedBreastfeedingSupport",
    name: "receivedBreastfeedingSupport",
    options: ["Yes", "No"],
    as: "radio",
  },
  {
    label: "How satisfied are you with the breastfeeding support you received?",
    id: "satisfactionBreastfeedingSupport",
    name: "satisfactionBreastfeedingSupport",
    options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"],
    as: "select",
    conditional: {
      field: "receivedBreastfeedingSupport",
      value: "Yes",
    },
    placeholder: "Select an option",
  },
  {
    label: "Have you received any mental health support postpartum?",
    id: "receivedMentalHealthSupport",
    name: "receivedMentalHealthSupport",
    options: ["Yes", "No"],
    as: "radio",
  },
  {
    label: "Have you been provided with information on newborn care?",
    id: "providedNewbornCareInfo",
    name: "providedNewbornCareInfo",
    options: ["Yes", "No"],
    as: "radio",
  },
  {
    label: "Which topics were covered? (Select all that apply)",
    id: "newbornCareTopics",
    name: "newbornCareTopics",
    placeholder: "Select all that apply",
    options: ["Feeding", "Bathing", "Sleeping", "Immunizations", "Others"],
    as: "checkbox",
    conditional: {
      field: "providedNewbornCareInfo",
      value: "Yes",
    },
  },
  {
    label: "Please specify other topics covered:",
    id: "otherNewbornCareTopics",
    name: "otherNewbornCareTopics",
    placeholder: "Enter other topics",
    type: "text",
    conditional: {
      field: "newbornCareTopics",
      value: "Others",
    },
  },
  {
    label: "Please share any additional comments or suggestions regarding your postnatal care experience.",
    id: "additionalComments",
    name: "additionalComments",
    placeholder: "Type comment here",
    as: "textarea"
  }
];

//Define type for postnatal survey values
export interface PostnatalSurveyValues {
  age: string;
  receivedPostnatalCheckups: string;
  numberOfPostnatalVisits: number | undefined;
  experiencedComplications: string;
  newbornExamination: string;
  receivedBreastfeedingSupport: string;
  satisfactionBreastfeedingSupport: string;
  receivedMentalHealthSupport: string;
  providedNewbornCareInfo: string;
  newbornCareTopics: string[];
  otherNewbornCareTopics: string;
  additionalComments: string;
}


// Validation Schema

export const postnatalValidationSchema = Yup.object({
  age: Yup.string().required("Required"),
  // Radio Button Fields
  receivedPostnatalCheckups: Yup.string().required("Required"),
  experiencedComplications: Yup.string().required("Required"),
  newbornExamination: Yup.string().required("Required"),
  receivedBreastfeedingSupport: Yup.string().required("Required"),
  receivedMentalHealthSupport: Yup.string().required("Required"),
  providedNewbornCareInfo: Yup.string().required("Required"),

  // Conditional Number Field
  numberOfPostnatalVisits: Yup.number()
    .when("receivedPostnatalCheckups", {
      is: "Yes",
      then: (schema) =>
        schema.required("Required").min(1, "Enter at least one visit"),
      otherwise: (schema) => schema.notRequired(),
    }),
  
  satisfactionBreastfeedingSupport: Yup.string().when("receivedBreastfeedingSupport", {
    is: "Yes",
    then: (schema) =>
      schema.required("Required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  // Conditional Checkbox Group
  newbornCareTopics: Yup.array().when("providedNewbornCareInfo", {
    is: "Yes",
    then: (schema) =>
      schema.min(1, "Select at least one topic").required("Required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  // Conditional Text Field for 'Others'
  otherNewbornCareTopics: Yup.string().when("newbornCareTopics", {
    is: (topics: string[]) => topics.includes("Others"),
    then: (schema) => schema.required("Required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  
  additionalComments: Yup.string(), // Assuming this is optional

});