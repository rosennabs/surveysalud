import { useField } from "formik";
import React from "react";

function FormField({
  label,
  as,
  options,
  ...props
}: {
  label: string;
  as: string;
  options: string[];
  [key: string]: any; //for additional attributes passed through props
}) {
  const [field, meta] = useField(props);

  return (
    <div className="flex flex-col py-4 px-2 w-full">
      {/*Question field*/}
      <label className="text-xl">{label}</label>

      {as === "select" ? (
        <>
          {/*Dropdown list options*/}
          <select
            {...field}
            {...props}
            className={`border-solid border w-full rounded-lg p-2 h-12 ${
              meta.touched && meta.error ? "border-red-600" : "border-teal-500"
            }`}
          >
            <option value=""></option>

            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {/*Display error message*/}
          {meta.touched && meta.error && (
            <div className="text-red-600">{meta.error}</div>
          )}
        </>
      ) : (
        <>
          {as === "textarea" ? (
            <textarea
              {...field}
              {...props}
              className={`border-solid border w-full rounded-lg p-4 ${
                meta.touched && meta.error
                  ? "border-red-600"
                  : "border-teal-500"
              }`}
            />
          ) : (
            <input
              {...field}
              {...props}
              className={`border-solid border w-full rounded-lg p-2 h-12 text-base ${
                meta.touched && meta.error
                  ? "border-red-600"
                  : "border-teal-500"
              }`}
            />
          )}

          {meta.touched && meta.error && (
            <div className="text-red-600">{meta.error}</div>
          )}
        </>
      )}
    </div>
  );
}

export default FormField;
