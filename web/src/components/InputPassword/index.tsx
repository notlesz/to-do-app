import { Eye, EyeSlash, Password } from "phosphor-react";
import { InputHTMLAttributes, useState } from "react";
import { HelperTextError, Input } from "./styles";

interface Props extends InputHTMLAttributes<{}> {
  password: string;
  isValidatedPassword: boolean;
  textError?: string;
}

export default function InputPassword({
  password,
  isValidatedPassword,
  textError,
  onChange,
  name,
  placeholder,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <Input isValidated={isValidatedPassword}>
        <Password size={32} />
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={password}
          name={name}
          onChange={onChange}
        />
        <span onClick={() => setShowPassword((state) => !state)}>
          {showPassword ? <EyeSlash size={32} /> : <Eye size={32} />}
        </span>
      </Input>
      {!isValidatedPassword && <HelperTextError>{textError}</HelperTextError>}
    </div>
  );
}
