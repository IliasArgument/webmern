import React, { FC } from "react";
import { Button as BtnUI } from "@nextui-org/react";
import { ButtonProps } from "@/interface";

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { color, onClick, ariaLabel, text, children, disabled, ...rest } =
    props;
  return (
    <BtnUI
      color={color}
      onClick={onClick}
      aria-label={ariaLabel}
      ariaLabel={ariaLabel}
      isDisabled={disabled}
      {...rest}
    >
      {children}
    </BtnUI>
  );
};

export default Button;
