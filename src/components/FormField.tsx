import { useField } from "formik";
import React from "react";

function FormField({ label, as, options, ...props } : {
    label: string;
    as: string;
  options: string[];
  [key: string]: any; //for additional attributes passed through props
}) {
  const [field, meta] = useField(props);

  if (as === "select") {
    return (
      <div className="flex flex-col p-4 w-full">
        {/*Question field*/}
        <label className="pb-4">{label}</label>

        {/*Dropdown list options*/}
        <select
          {...field}
          {...props}
          className={`border-solid border-2 w-full rounded-lg p-2 ${
            meta.touched && meta.error ? "border-red-600" : "border-green-600 "
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
      </div>
    );
  } else {
    return (
      <div className="flex flex-col p-4 w-full">
        <label className="pb-4">{label}</label>
        {as === "textarea" ? (
          <textarea
            {...field}
            {...props}
            className={`border-solid border-2 w-full rounded-lg p-4 ${
              meta.touched && meta.error ? "border-red-600" : "border-green-600 "
            }`}
          />
        ) : (
          <input
            {...field}
            {...props}
            className={`border-solid border-2 w-full rounded-lg p-2 ${
              meta.touched && meta.error ? "border-red-600" : "border-green-600 "
            }`}
          />
        )}

        {meta.touched && meta.error && (
          <div className="text-red-600">{meta.error}</div>
        )}
      </div>
    );
  }

}

export default FormField;
