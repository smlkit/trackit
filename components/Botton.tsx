import React, { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, text, disabled, type = "button", ...props }, ref) => {
    return (
      <button
        type={type}
        className={className}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {text}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
