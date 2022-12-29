import { InputHTMLAttributes, ReactNode } from "react";
import { CustomInput, HelperTextError } from "./styles";

interface Props extends InputHTMLAttributes<{}> {
  isValidatedValue: boolean;
  textError?: string;
  startIcon?: ReactNode;
}

export default function Input({
  startIcon,
  value,
  isValidatedValue,
  textError,
  placeholder,
  type,
  name,
  onChange,
}: Props) {
  return (
    <div>
      <CustomInput isValidated={isValidatedValue}>
        {startIcon}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </CustomInput>
      {!isValidatedValue && <HelperTextError>{textError}</HelperTextError>}
    </div>
  );
}
