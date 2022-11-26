import { At, SignIn } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageLogin from "../../assets/image_home.svg";
import CustomInput from "../../components/CustomInput";
import InputPassword from "../../components/InputPassword";
import Loading from "../../components/Loading";
import { useCredentials } from "../../hooks/useCredentials";
import { validateEmail, validatePassword } from "../../utils/validators";
import {
  BoxLoading,
  ContainerActions,
  CreateAccount,
  LoginContainer,
  LoginForm,
  LoginMain,
  LoginSection,
  LoginSubmitButton,
  LoginSubTitle,
  LoginTitle,
} from "./styles";

interface Credentials {
  email: string;
  password: string;
  isValidatedEmail: boolean;
  isValidatedPassword: boolean;
  textErrorEmail: string;
  textErrorPassword: string;
}

export default function Login() {
  const { loading, login } = useCredentials();
  const [userCredentials, setUserCredentials] = useState<Credentials>({
    email: "",
    password: "",
    isValidatedEmail: true,
    isValidatedPassword: true,
    textErrorEmail: "",
    textErrorPassword: "",
  });

  const navigate = useNavigate();

  const verifyEmail = () => {
    if (!userCredentials.isValidatedEmail) {
      setUserCredentials((state) => ({
        ...state,
        textErrorEmail: "Invalid E-mail",
      }));
    } else {
      setUserCredentials((state) => ({
        ...state,
        textErrorEmail: "",
      }));
    }
  };

  const verifyPassword = () => {
    if (!userCredentials.isValidatedPassword) {
      setUserCredentials((state) => ({
        ...state,
        textErrorPassword: "Your password must contain at least 6 characters",
      }));
    } else {
      setUserCredentials((state) => ({
        ...state,
        textErrorPassword: "",
      }));
    }
  };

  const handleChangeEmail = (email: string) => {
    setUserCredentials((state) => ({ ...state, email }));
  };

  const handleChangePassword = (password: string) => {
    setUserCredentials((state) => ({ ...state, password }));
  };

  const handleChangeValidatedEmail = () => {
    setUserCredentials((state) => ({
      ...state,
      isValidatedEmail: validateEmail(state.email),
    }));
  };

  const handleChangeValidatedPassword = () => {
    setUserCredentials((state) => ({
      ...state,
      isValidatedPassword: validatePassword(state.password),
    }));
  };

  const onSubmitForm = (event: FormEvent) => {
    event.preventDefault();
    if (userCredentials.email.length === 0)
      setUserCredentials((state) => ({ ...state, isValidatedEmail: false }));
    if (userCredentials.password.length === 0)
      setUserCredentials((state) => ({
        ...state,
        isValidatedPassword: false,
      }));

    if (
      userCredentials.isValidatedEmail &&
      userCredentials.email.length > 0 &&
      userCredentials.isValidatedPassword &&
      userCredentials.password.length > 0
    ) {
      login(userCredentials.email, userCredentials.password);
    }
  };

  useEffect(() => {
    verifyEmail();
    verifyPassword();
  }, [userCredentials]);

  return (
    <LoginMain>
      <LoginContainer>
        <img src={ImageLogin} alt="" />
        {loading ? (
          <BoxLoading>
            <Loading size="large" color="primary" />
          </BoxLoading>
        ) : (
          <LoginSection>
            <LoginTitle>To Do Dev</LoginTitle>
            <LoginSubTitle className="subtitle">Sign In</LoginSubTitle>
            <LoginForm onSubmit={onSubmitForm}>
              <CustomInput
                startIcon={<At size={32} />}
                isValidatedValue={userCredentials.isValidatedEmail}
                value={userCredentials.email}
                handleChangeValue={handleChangeEmail}
                handleChangeValidatedValue={handleChangeValidatedEmail}
                textError={userCredentials.textErrorEmail}
                placeholder="Email"
                type="email"
              />
              <InputPassword
                isValidatedPassword={userCredentials.isValidatedPassword}
                password={userCredentials.password}
                handleChangeValidatedPassword={handleChangeValidatedPassword}
                handleChangePassword={handleChangePassword}
                textErrorPassword={userCredentials.textErrorPassword}
                placeholder="Password"
              />
              <ContainerActions>
                <CreateAccount onClick={() => navigate("/register")}>
                  Create an account!
                </CreateAccount>
                <LoginSubmitButton type="submit">
                  Login
                  <SignIn size={30} />
                </LoginSubmitButton>
              </ContainerActions>
            </LoginForm>
          </LoginSection>
        )}
      </LoginContainer>
    </LoginMain>
  );
}
