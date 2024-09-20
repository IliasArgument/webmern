import { IUserAuth } from "@/types/User";
import React, { FC, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

type FieldName =
  | "name"
  | "major"
  | "age"
  | "password"
  | "email"
  | "repeat-password";

interface IField<T extends IUserAuth> {
  label?: string;
  type?: string;
  id?: string; // FieldName
  name: FieldName;
  register: UseFormRegister<T>;
  required?: boolean;
  validation?: { [key: string]: any };
  errors?: any;
  [key: string]: any;
}

const InputRequired: FC<IField<IUserAuth>> = ({
  label,
  name,
  id,
  type = "text",
  register,
  required,
  validation,
  errors,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <label htmlFor={id} aria-label={label} className="relative block">
      {label}
      <input
        {...register(name as keyof IUserAuth, {
          required: true,
          ...validation,
        })}
        {...props}
        type={showPassword && type === "password" ? "text" : type}
        className={`input-base flex w-full px-3 text-teal-900 border-solid border-2 rounded-md mb-2 ${
          errors[`${name}` as keyof IUserAuth]
            ? "border-y-rose-600"
            : "border-sky-500"
        }`}
        aria-invalid={errors[`${name}` as keyof IUserAuth] ? "true" : "false"}
      />

      {type === "password" && (
        <span
          onClick={togglePasswordVisibility}
          className="absolute bottom-0 top-4 right-0 pr-3 flex items-center cursor-pointer"
        >
          {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
        </span>
      )}
    </label>
  );
};

export default InputRequired;
