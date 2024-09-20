import { InputProps } from "@/interface";
import React, { FC, forwardRef } from "react";

const Input: FC<InputProps> = forwardRef(
  (
    { label, id, type = "text", className, onClick, ...props }: InputProps,
    ref
  ) => {
    return (
      <label htmlFor={id}>
        {label && label}
        <input
          type={type}
          id={id}
          ref={ref}
          onClick={onClick}
          className={`${className}${"input-base flex w-full px-3 text-teal-900 border-solid border-2 border-sky-500 rounded-sm mb-2"}`}
          {...props}
        />
      </label>
    );
  }
);

export default Input;
