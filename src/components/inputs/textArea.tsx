import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const TextArea = ({ value, handleChange, field, ...rest }: any) => {
  const [_value, setValue] = useState(value);

  const overrideChange = (e: any) => {
    const value = e.target.value;
    setValue(value);
    handleChange(value, field);
  };

  return (
    <textarea
      className="form-control"
      value={_value}
      onChange={overrideChange}
      {...rest}
    />
  );
};
