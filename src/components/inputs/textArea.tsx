import React, { useEffect, useRef, useState } from "react";

export const TextArea = ({ value, handleChange, field, ...rest }: any) => {
  const [_value, setValue] = useState(value);

  const overrideChange = (e: any) => {
    const value = e.target.value;
    setValue(value);
    handleChange(value, field);
  };

  return (
    <textarea
      className="textarea"
      value={_value}
      onChange={overrideChange}
      {...rest}
    />
  );
};
