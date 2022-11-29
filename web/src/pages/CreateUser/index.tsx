import { At, UserCircle, UserCirclePlus } from "phosphor-react";
import { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageNewUser from "../../assets/image_new_user.svg";
import CustomInput from "../../components/CustomInput";
import InputPassword from "../../components/InputPassword";
import Loading from "../../components/Loading";
import { AuthContext } from "../../context/authContext";
import { validateEmail, validatePassword } from "../../utils/validators";
import { ContainerActions } from "../Login/styles";
import {
  BackToLogin,
  BoxLoading,
  ErrorMessage,
  RegisterContainer,
  RegisterForm,
  RegisterMain,
  RegisterSection,
  RegisterSubmitButton,
  RegisterSubTitle,
  RegisterTitle,
} from "./styles";

interface NewUserCredentials {
  name: string;
  email: string;
  password: string;
  repeatedPassword: string;
  isValidatedName: boolean;
  isValidatedEmail: boolean;
  isValidatedPassword: boolean;
  isValidatedRepeatedPassword: boolean;
  textErrorName: string;
  textErrorEmail: string;
  textErrorPassword: string;
  textErrorRepeatedPassword: string;
}

export default function CreateUser() {
  const { createUser, loading, errorMessage } = useContext(AuthContext);
  const [newUser, setNewUser] = useState<NewUserCredentials>({
    name: "",
    email: "",
    password: "",
    repeatedPassword: "",
    isValidatedName: true,
    isValidatedEmail: true,
    isValidatedPassword: true,
    isValidatedRepeatedPassword: true,
    textErrorName: "",
    textErrorEmail: "",
    textErrorPassword: "",
    textErrorRepeatedPassword: "",
  });

  const navigate = useNavigate();

  const handleChangeName = (name: string) => {
    setNewUser((state) => ({ ...state, name }));
  };

  const handleChangeEmail = (email: string) => {
    setNewUser((state) => ({ ...state, email }));
  };

  const handleChangePassword = (password: string) => {
    setNewUser((state) => ({ ...state, password }));
  };

  const handleChangeRepeatedPassword = (repeatedPassword: string) => {
    setNewUser((state) => ({ ...state, repeatedPassword }));
  };

  const handleChangeValidatedName = () => {
    setNewUser((state) => ({
      ...state,
      isValidatedName: state.name.length > 3,
    }));
  };

  const handleChangeValidatedEmail = () => {
    setNewUser((state) => ({
      ...state,
      isValidatedEmail: validateEmail(state.email),
    }));
  };

  const handleChangeValidatedPassword = () => {
    setNewUser((state) => ({
      ...state,
      isValidatedPassword: validatePassword(state.password),
    }));
  };

  const handleChangeValidatedRepeatedPassword = () => {
    setNewUser((state) => ({
      ...state,
      isValidatedRepeatedPassword: validatePassword(state.repeatedPassword),
    }));
    verifyBothPasswords();
  };

  const verifyUser = () => {
    if (!newUser.isValidatedName) {
      setNewUser((state) => ({
        ...state,
        textErrorName: "Seu nome deve conter no mínimo 5 caracteres.",
      }));
    } else {
      setNewUser((state) => ({
        ...state,
        textErrorName: "",
      }));
    }

    if (!newUser.isValidatedEmail) {
      setNewUser((state) => ({
        ...state,
        textErrorEmail: "Email inválido!",
      }));
    } else {
      setNewUser((state) => ({
        ...state,
        textErrorEmail: "",
      }));
    }

    if (!newUser.isValidatedPassword) {
      setNewUser((state) => ({
        ...state,
        textErrorPassword: "Sua senha deve conter no mínimo 6 caracteres.",
      }));
    } else {
      setNewUser((state) => ({
        ...state,
        textErrorPassword: "",
      }));
    }

    if (!newUser.isValidatedRepeatedPassword) {
      setNewUser((state) => ({
        ...state,
        textErrorRepeatedPassword:
          "Sua senha deve conter no mínimo 6 caracteres.",
      }));
    } else {
      setNewUser((state) => ({
        ...state,
        textErrorRepeatedPassword: "",
      }));
      verifyBothPasswords();
    }
  };

  const verifyBothPasswords = () => {
    if (newUser.password === newUser.repeatedPassword) {
      setNewUser((state) => ({ ...state, textErrorRepeatedPassword: "" }));
    } else {
      setNewUser((state) => ({
        ...state,
        textErrorRepeatedPassword: "Senhas não coincidem",
        isValidatedRepeatedPassword: false,
      }));
    }
  };

  const onSubmitForm = async (event: FormEvent) => {
    event.preventDefault();
    if (newUser.email.length === 0)
      setNewUser((state) => ({ ...state, isValidatedEmail: false }));
    if (newUser.password.length === 0)
      setNewUser((state) => ({
        ...state,
        isValidatedPassword: false,
      }));
    if (newUser.repeatedPassword?.length === 0)
      setNewUser((state) => ({ ...state, isValidatedRepeatedPassword: false }));

    if (
      newUser.isValidatedEmail &&
      newUser.email.length > 0 &&
      newUser.isValidatedPassword &&
      newUser.password.length > 0 &&
      newUser.isValidatedRepeatedPassword &&
      newUser?.repeatedPassword?.length! > 0
    ) {
      createUser(newUser.name, newUser.email, newUser.password);
    }
  };

  useEffect(() => {
    if (!errorMessage) {
      verifyUser();
    } else {
      setNewUser((state) => ({
        ...state,
        isValidatedEmail: false,
        isValidatedName: false,
        isValidatedPassword: false,
        isValidatedRepeatedPassword: false,
      }));
    }
  }, [
    newUser.isValidatedEmail,
    newUser.isValidatedName,
    newUser.isValidatedPassword,
    newUser.isValidatedRepeatedPassword,
    errorMessage,
  ]);

  return (
    <RegisterMain>
      <RegisterContainer>
        <img src={ImageNewUser} alt="" />
        {loading ? (
          <BoxLoading>
            <Loading size="large" color="primary" />
          </BoxLoading>
        ) : (
          <RegisterSection>
            <RegisterTitle>To Do Dev</RegisterTitle>
            <RegisterSubTitle>Criar conta</RegisterSubTitle>
            <RegisterForm onSubmit={onSubmitForm}>
              <CustomInput
                startIcon={<UserCircle size={30} />}
                isValidatedValue={newUser.isValidatedName}
                value={newUser.name}
                handleChangeValue={handleChangeName}
                handleChangeValidatedValue={handleChangeValidatedName}
                placeholder="Seu nome completo"
                textError={newUser.textErrorName}
                type="text"
              />
              <CustomInput
                startIcon={<At size={30} />}
                isValidatedValue={newUser.isValidatedEmail}
                value={newUser.email}
                handleChangeValue={handleChangeEmail}
                handleChangeValidatedValue={handleChangeValidatedEmail}
                textError={newUser.textErrorEmail}
                placeholder="Email"
                type="email"
              />
              <InputPassword
                isValidatedPassword={newUser.isValidatedPassword}
                password={newUser.password}
                handleChangeValidatedPassword={handleChangeValidatedPassword}
                handleChangePassword={handleChangePassword}
                textErrorPassword={newUser.textErrorPassword}
                placeholder="Senha"
              />
              <InputPassword
                isValidatedPassword={newUser.isValidatedRepeatedPassword!}
                password={newUser.repeatedPassword!}
                handleChangeValidatedPassword={
                  handleChangeValidatedRepeatedPassword
                }
                handleChangePassword={handleChangeRepeatedPassword}
                textErrorPassword={newUser.textErrorRepeatedPassword!}
                placeholder="Repita sua senha"
              />
              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
              <ContainerActions>
                <BackToLogin onClick={() => navigate("/")}>Entrar</BackToLogin>
                <RegisterSubmitButton type="submit">
                  Criar
                  <UserCirclePlus size={30} />
                </RegisterSubmitButton>
              </ContainerActions>
            </RegisterForm>
          </RegisterSection>
        )}
      </RegisterContainer>
    </RegisterMain>
  );
}
