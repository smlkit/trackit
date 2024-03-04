import React from "react";

type InputProps = {
  placeholder?: string;
  type: string;
};

const Input = ({ placeholder, type }: InputProps) => {
  if (type === "textarea")
    return <textarea placeholder={placeholder} className="input" />;
  return (
    <input
      type={type}
      accept="image/*"
      placeholder={placeholder}
      className="input"
    />
  );
};

export default Input;
