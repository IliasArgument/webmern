export interface ButtonProps extends React.ComponentProps<"button"> {
  color?: "primary" | "secondary" | "tertiary" | "ghost" | "danger";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  ariaLabel: string;
  width?: string | number;
  text?: string;
  children?: string | React.ReactNode; // Union type for text or ReactNode
}

export interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  type?: string;
  id?: string;
  name: string;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
}

export interface IFormInput {
  name: string;
  age: number;
  major: string;
}
