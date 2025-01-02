import * as Yup from 'yup';

export const antenatalSurvey = [
  {
    label: "What is your age?",
    id: "age",
    name: "age",
    placeholder: "Select an option",
    options: ["Under 18", "18 - 24", "25 - 34", "35 - 44", "45 and above"],
    as: "select"
  },
  {
    label: "How many weeks pregnant are you?",
    id: "gestationalAge",
    name: "gestationalAge",
    placeholder: "Enter number",
    type: "number",
    min: 1,
    max: 45,
  },
  {
    label: "How many prenatal checkups have you had during this pregnancy?",
    id: "numberOfCheckups",
    name: "numberOfCheckups",
    placeholder: "Enter number",
    type: "number",
    min: 0,
    max: 45,
  },
  
  {
    label: "How would you rate the accessibility of your antenatal care services?",
    id: "accessibilityCare",
    name: "accessibilityCare",
    placeholder: "Select an option",
    options: ["Very Accessible", "Accessible", "Neutral", "Inaccessible", "Very Inaccessible"],
    as: "select"
  },
  {
    label: "Are you taking iron and folic acid supplements?",
    id: "antenatalSupplements",
    name: "antenatalSupplements",
    placeholder: "Select an option",
    options: ["Yes", "No"],
    as: "radio"
  },
  
  {
    label: "Which of the following vaccinations have you received during your pregnancy?",
    id: "vaccinationsReceived",
    name: "vaccinationsReceived",
    placeholder: "Select all that",
    options: ["Influenza (Flu)", "Tetanus, Diphtheria, and Pertussis (Tdap)", "COVID-19", "Hepatitis B", "None"],
    as: "checkbox"
  },
  {
    label: "Have you undergone any of the following screening tests?",
    id: "screeningTests",
    name: "screeningTests",
    placeholder: "Select all that apply",
    options: [
      "Blood Pressure Measurement",
      "Blood Tests (e.g., anemia, blood type)",
      "Urine Tests",
      "Ultrasound Examinations",
      "Glucose Screening for Gestational Diabetes",
      "None"
    ],
    as: "checkbox"
  },
  {
    label: "Have you received any health education or counseling during your antenatal visits?",
    id: "healthEducationReceived",
    name: "healthEducationReceived",
    placeholder: "Select an option",
    options: ["Yes", "No"],
    as: "radio"
  },
  
  {
    label: "How satisfied are you with the antenatal care you have received so far?",
    id: "satisfactionCare",
    name: "satisfactionCare",
    placeholder: "Select an option",
    options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"],
    as: "select"
  },
  {
    label: "Please share any additional comments or suggestions regarding your antenatal care experience.",
    id: "additionalComments",
    name: "additionalComments",
    placeholder: "Type comment here",
    as: "textarea"
  }
];


// Define types for each property in antenatal survey

export interface AntenatalSurveyValues {
  age: string;
  gestationalAge: number;
  numberOfCheckups: number;
  accessibilityCare: string;
  antenatalSupplements: string;
  vaccinationsReceived: string[];
  screeningTests: string[];
  healthEducationReceived: string;
  satisfactionCare: string;
  areasImprovement: string;
  additionalComments: string;
}


// Validation Schema

export const antenatalSurveyValidationSchema = Yup.object({
  // Dropdown (Select) Fields
  age: Yup.string().required("Required"),
  timingFirstCheckup: Yup.string().required("Required"),
  accessibilityCare: Yup.string().required("Required"),
  satisfactionCare: Yup.string().required("Required"),

  // Radio Button Fields
  antenatalSupplements: Yup.string().required("Required"),
  
  healthEducationReceived: Yup.string().required("Required"),

  // Numbers
  gestationalAge: Yup.number()
    .min(1, "Cannot be negative")
    .max(45, "Exceeds maximum weeks")
    .required("Required"),
  numberOfCheckups: Yup.number()
    .min(0, "Cannot be negative")
    .max(45, "Exceeds maximum number")
    .required("Required"),

  // Checkbox Fields
  locationCheckups: Yup.string().required("Required"),
  vaccinationsReceived: Yup.array().min(1, "Required"),
  screeningTests: Yup.array().min(1, "Required"),

  // Conditional Fields using schema syntax
  other_locationCheckups: Yup.string().when("locationCheckups", {
    is: "Other [Please Specify]",
    then: (schema) => schema.required("Required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  
  // Text Areas
  additionalComments: Yup.string(), // Assuming this is optional
});



