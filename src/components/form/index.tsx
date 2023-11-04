import React from "react";
import { useState } from "react";
import "./index.css";
import { Input } from "../inputs/input";

export const Form = ({ fields, setData, message, setButtonPressed }: any) => {
  console.log(">>>Form fields: ", fields);
  const [formData, setFormData]: any = useState({});
  console.log(">>>formData: ", formData);
  const handleChange = (value: string, field: string) => {
    formData[field] = value;
    setFormData(formData);
  };
  const handleClick = () => {
    console.log(">>>Sign Up data: ", formData);
    setButtonPressed(true);
    setData(formData);
  };

  const input = (field: string, placeholder: string = "", type = "text") => {
    console.log(">>>Form field: ", field);
    return (
      <div className="form__field">
        <Input
          handleChange={handleChange}
          field={field}
          placeholder={placeholder}
          value={formData[field] || ""}
          className="form__input"
          type={type}
        />
      </div>
    );
  };

  return (
    <div className="signup">
      {fields.map((field: any) => {
        const { field: fieldName, placeholder, type } = field;
        return input(fieldName, placeholder, type);
      })}
      <button onClick={handleClick} className="button signup__submit">
        <span className="button__text">{message}</span>
        <i className="button__icon fas fa-chevron-right"></i>
      </button>
    </div>
  );
};
