import { useField, FormikHelpers } from "formik";
import React from "react";


interface FormFieldProps {
  label: string;
  id: string;
  name: string;
  placeholder?: string;
  options?: string[];
  type?: string;
  min?: number;
  max?: number;
  as?: string; // Optional prop
  setFieldValue?: FormikHelpers<any>["setFieldValue"];
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  name,
  placeholder,
  options,
  as = "input", // Default to 'input' if 'as' is not provided,
  ...props 
}) => {
  const [field, meta] = useField(name);

  // Function to render the appropriate input type based on 'as' prop
  const renderField = () => {
    switch (as) {
      case "select":
        return (
          <select
            {...field}
            {...props}
            className={`border-solid border w-full rounded-lg p-2 h-12 ${meta.touched && meta.error ? "border-red-600" : "border-teal-500"
              }`}
          >
            <option value="" disabled>{placeholder}</option>

            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      
      case "textarea":
        return (
          <textarea
            {...field}
            {...props}
            placeholder={placeholder}
            className={`border-solid border w-full rounded-lg p-2 h-[140px] ${meta.touched && meta.error
              ? "border-red-600"
              : "border-teal-500"
              }`}
          />
        );
      
      case "checkbox":
        return (
          <div className="flex flex-col space-y-2">
            {options &&
              options.map((option) => (
                
                <label key={option} className="flex items-center w-max">
                  <input
                    type="checkbox"
                    {...field}
                    value={option}
                    checked={field.value.includes(option)}
                    className={`border-solid border rounded-lg p-2 h-6 w-6 ${meta.touched && meta.error ? "border-red-600" : "border-teal-500"
                      }`}
                  />
                  <span className="ml-2">{option}</span>
                </label>
              ))}
            </div>
        );
      
      case "radio":
        return (
          <div className="flex flex-col space-y-2">
            {options.map((option) => (
              <label key={option} className="flex items-center w-max">
                <input
                  type="radio"
                  {...field}
                  value={option}
                  checked={field.value === option}
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}
          </div>
        );
      
      default:
        return (
          <input
            {...field}
            {...props}
            className={`border-solid border w-full rounded-lg p-2 h-12 text-base ${meta.touched && meta.error
              ? "border-red-600"
              : "border-teal-500"
              }`}
          />
        );
    }
  };


  return (
    <div className="flex flex-col py-4 px-2 w-full text-base">
     
      <label className="pb-4">
        {label}
      </label>
      {renderField()}
      {meta.touched && meta.error && (
        <div className="text-red-600">{meta.error}</div>
      )}
      </div>

      
  );
}

export default FormField;
