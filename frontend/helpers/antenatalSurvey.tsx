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
    min: 0,
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
    label: "In which trimester did you have your first checkup?",
    id: "timingFirstCheckup",
    name: "timingFirstCheckup",
    placeholder: "Select an option",
    options: ["First", "Second", "Third"],
    as: "select"
  },
  {
    label: "Where do you receive your checkups?",
    id: "locationCheckups",
    name: "locationCheckups",
    placeholder: "Select all that apply",
    options: ["Hospital", "Community Clinic", "Private Doctor", "Mobile Health Unit", "Other [Please Specify]"],
    as: "checkbox"
  },

  // Conditional field for specifying "Other" locations
  {
    label: "Please specify other locations:",
    id: "other_locationCheckups",
    name: "other_locationCheckups",
    placeholder: "Enter other locations",
    type: "text",
    conditional: {
      field: "locationCheckups",
      value: "Other [Please Specify]",
    },
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
    label: "On average, how long does it take you to travel to your antenatal care provider?",
    id: "travelTime",
    name: "travelTime",
    placeholder: "Select an option",
    options: ["Less than 15 minutes", "15-30 minutes", "31-60 minutes", "More than 60 minutes"],
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
    label: "Have you received any nutritional counseling during your pregnancy?",
    id: "nutritionCounseling",
    name: "nutritionCounseling",
    placeholder: "Select an option",
    options: ["Yes", "No"],
    as: "radio"
  },
  {
    label: "How would you describe your daily dietary intake?",
    id: "dietaryIntake",
    name: "dietaryIntake",
    placeholder: "Select an option",
    options: ["Balanced and nutritious", "Moderately balanced", "Poorly balanced", "Not sure"],
    as: "select"
  },
  {
    label: "Which of the following vaccinations have you received during your pregnancy?",
    id: "vaccinationsReceived",
    name: "vaccinationsReceived",
    placeholder: "Select an option",
    options: ["Influenza (Flu)", "Tetanus, Diphtheria, and Pertussis (Tdap)", "COVID-19", "Hepatitis B", "None"],
    as: "select"
  },
  {
    label: "Have you undergone any of the following screening tests?",
    id: "screeningTests",
    name: "screeningTests",
    placeholder: "Select an option",
    options: [
      "Blood Pressure Measurement",
      "Blood Tests (e.g., anemia, blood type)",
      "Urine Tests",
      "Ultrasound Examinations",
      "Glucose Screening for Gestational Diabetes",
      "None"
    ],
    as: "select"
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
    label: "Which topics were covered in your antenatal health education sessions?",
    id: "topicsCovered",
    name: "topicsCovered",
    placeholder: "Select all that apply",
    options: [
      "Nutrition and Diet",
      "Exercise and Physical Activity",
      "Warning Signs and Complications",
      "Breastfeeding",
      "Postnatal Care",
      "Infant Care",
      "Family Planning",
      "Other [Please Specify]"
    ],
    as: "checkbox"
  },
  // Conditional field for specifying "Other" topics covered
  {
    label: "Please specify other topics covered:",
    id: "other_topicsCovered",
    name: "other_topicsCovered",
    placeholder: "Enter other topics",
    type: "text",
    conditional: {
      field: "topicsCovered",
      value: "Other [Please Specify]",
    },
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


// Validation Schema

export const antenatalSurveyValidationSchema = Yup.object({
  // Dropdown (Select) Fields
  age: Yup.string().required("Required"),
  timingFirstCheckup: Yup.string().required("Required"),
  accessibilityCare: Yup.string().required("Required"),
  travelTime: Yup.string().required("Required"),
  dietaryIntake: Yup.string().required("Required"),
  satisfactionCare: Yup.string().required("Required"),

  // Radio Button Fields
  antenatalSupplements: Yup.string().required("Required"),
  nutritionCounseling: Yup.string().required("Required"),
  healthEducationReceived: Yup.string().required("Required"),

  // Numbers
  gestationalAge: Yup.number()
    .min(0, "Cannot be negative")
    .max(45, "Exceeds maximum weeks")
    .required("Required"),
  numberOfCheckups: Yup.number()
    .min(0, "Cannot be negative")
    .max(45, "Exceeds maximum number")
    .required("Required"),

  // Checkbox Fields
  locationCheckups: Yup.array().min(1, "Required"),
  vaccinationsReceived: Yup.array().min(1, "Required"),
  screeningTests: Yup.array().min(1, "Required"),
  topicsCovered: Yup.array().min(1, "Required"),

   // Conditional Fields using function syntax
  other_locationCheckups: Yup.string().when("locationCheckups", (locationCheckups: string[], schema: Yup.StringSchema) => {
    return locationCheckups.includes("Other [Please Specify]")
      ? schema.required("Required")
      : schema;
  }),
  other_topicsCovered: Yup.string().when("topicsCovered", (topicsCovered: string[], schema: Yup.StringSchema) => {
    return topicsCovered.includes("Other [Please Specify]")
      ? schema.required("Required")
      : schema;
  }),

  
  // Text Areas
  additionalComments: Yup.string(), // Assuming this is optional
});



