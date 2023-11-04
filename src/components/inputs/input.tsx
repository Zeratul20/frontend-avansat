import React, { useEffect, useRef, useState } from "react";

export const Input = ({ value, handleChange, field, ...rest }: any) => {
  const [_value, setValue] = useState(value);

  const overrideChange = (e: any) => {
    const value = e.target.value;
    setValue(value);
    console.log(">>>Input value, field: ", value, field);
    handleChange(value, field);
  };

  return (
    <input
      className="input"
      value={_value}
      onChange={overrideChange}
      {...rest}
    />
  );
};
