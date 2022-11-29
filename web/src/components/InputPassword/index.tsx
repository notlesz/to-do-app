import { Eye, EyeSlash, Password } from "phosphor-react";
import { InputHTMLAttributes, useState } from "react";
import { HelperTextError, Input } from "./styles";

interface Props extends InputHTMLAttributes<{}> {
  password: string;
  isValidatedPassword: boolean;
  handleChangePassword: (password: string) => void;
  handleChangeValidatedPassword: () => void;
  textErrorPassword: string;
}

export default function InputPassword({
  password,
  isValidatedPassword,
  textErrorPassword,
  handleChangePassword,
  handleChangeValidatedPassword,
  placeholder,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <Input
        isValidated={isValidatedPassword}
        onBlur={() => handleChangeValidatedPassword()}
      >
        <Password size={32} />
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={password}
          onChange={(event) => handleChangePassword(event.target.value)}
        />
        <span onClick={() => setShowPassword((state) => !state)}>
          {showPassword ? <EyeSlash size={32} /> : <Eye size={32} />}
        </span>
      </Input>
      {!isValidatedPassword && (
        <HelperTextError>{textErrorPassword}</HelperTextError>
      )}
    </div>
  );
}
