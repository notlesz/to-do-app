import { InputHTMLAttributes, ReactNode } from "react";
import { HelperTextError, Input } from "./styles";

interface Props extends InputHTMLAttributes<{}> {
  isValidatedValue: boolean;
  handleChangeValue: (email: string) => void;
  handleChangeValidatedValue: () => void;
  textError?: string;
  startIcon?: ReactNode;
}

export default function CustomInput({
  startIcon,
  value,
  isValidatedValue,
  handleChangeValue,
  handleChangeValidatedValue,
  textError,
  placeholder,
  type,
}: Props) {
  return (
    <div>
      <Input
        isValidated={isValidatedValue}
        onBlur={() => {
          handleChangeValidatedValue && handleChangeValidatedValue();
        }}
      >
        {startIcon}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(event) => handleChangeValue(event.target.value)}
        />
      </Input>
      {!isValidatedValue && <HelperTextError>{textError}</HelperTextError>}
    </div>
  );
}
