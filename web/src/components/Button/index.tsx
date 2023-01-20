import { ButtonHTMLAttributes } from "react";
import { CustomButton } from "./styles";

export interface IButton extends ButtonHTMLAttributes<{}> {
  variant: "contained" | "text" | "outlined";
}
export default function Button({ variant = "contained", ...props }: IButton) {
  return <CustomButton variant={variant} {...props}></CustomButton>;
}
