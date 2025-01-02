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
    label: "Have you received breastfeeding support after delivery?",
    id: "receivedBreastfeedingSupport",
    name: "receivedBreastfeedingSupport",
    options: ["Yes", "No"],
    as: "radio",
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
  receivedBreastfeedingSupport: string;
  receivedMentalHealthSupport: string;
  providedNewbornCareInfo: string;
  additionalComments: string;
}


// Validation Schema

export const postnatalValidationSchema = Yup.object({
  age: Yup.string().required("Required"),
  // Radio Button Fields
  receivedPostnatalCheckups: Yup.string().required("Required"),
  experiencedComplications: Yup.string().required("Required"),
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
  
  
  additionalComments: Yup.string(), // Assuming this is optional

});