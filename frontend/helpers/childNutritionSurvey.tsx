import * as Yup from "yup";

// Survey Questions
export const childNutritionSurvey = [
  {
    label: "What is the age of your child?",
    id: "age",
    name: "age",
    placeholder: "Select an option",
    options: ["Under 1", "1-2", "3-5", "5 and above"],
    as: "select"
  },
  {
    label: "Register child's weight in kg",
    id: "childWeight",
    name: "childWeight",
    placeholder: "kg",
    type: "number",
    min: 0,
    max: 50,
  },
  {
    label: "Is/Was your child exclusively breastfed?",
    id: "exclusiveBreastfeeding",
    name: "exclusiveBreastfeeding",
    options: ["Yes", "No"],
    as: "radio",
  },
  {
    label: "At what age (months) did you introduce complementary foods?",
    id: "ageComplementaryFoods",
    name: "ageComplementaryFoods",
    placeholder: "Enter age in months",
    type: "number",
    min: 0,
    max: 24,
  },
  {
    label: "How many times does the child eat solid foods per day?",
    id: "mealFrequency",
    name: "mealFrequency",
    placeholder: "Enter number",
    type: "number",
  },
  {
    label: "When was the last time the child's weight or height was checked?",
    id: "lastGrowthCheckup",
    name: "lastGrowthCheckup",
    placeholder: "Select an option",
    options: ["Less than a month ago", "1-3 months ago", "4-6 months ago", "More than 6 months ago"],
    as: "select"
  },
  {
    label: "Do you have a child growth chart at home?",
    id: "growthChartAtHome",
    name: "growthChartAtHome",
    options: ["Yes", "No"],
    as: "radio",
  },
];

// Type Definitions
export interface ChildNutritionSurveyValues {
  age: string;
  childWeight: number;
  exclusiveBreastfeeding: string;
  ageComplementaryFoods: number;
  mealFrequency: number;
  lastGrowthCheckup: string;
  growthChartAtHome: string;
}

// Validation Schema


export const childNutritionValidationSchema = Yup.object({
  age: Yup.string().required("Required"),

  childWeight: Yup.number()
    .required("Required")
    .min(0, "Weight cannot be less than 0")
    .max(50, "Weight cannot exceed 50kg"),
  
  exclusiveBreastfeeding: Yup.string().required("Required"),
  ageComplementaryFoods: Yup.number()
    .required("Required")
    .min(0, "Age cannot be less than 0 months")
    .max(24, "Age cannot exceed 24 months"),
  mealFrequency: Yup.number()
    .required("Required")
    .min(0, "Meal frequency cannot be less than 0")
    .max(10, "Meal frequency cannot exceed 10"),
  lastGrowthCheckup: Yup.string().required("Required"),
  growthChartAtHome: Yup.string().required("Required"),
});
