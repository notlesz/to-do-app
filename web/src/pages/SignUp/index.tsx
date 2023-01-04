import { useFormik } from "formik/dist";
import { At, UserCircle, UserCirclePlus } from "phosphor-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ImageNewUser from "../../assets/image_new_user.svg";
import Input from "../../components/Input";
import InputPassword from "../../components/InputPassword";
import Loading from "../../components/Loading";
import { AuthContext } from "../../context/authContext";
import { ContainerActions } from "../SignIn/styles";
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

export default function SignUp() {
  const { userRegister, loading, errorMessage } = useContext(AuthContext);
  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      repeatedPassword: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(6, "Seu nome deve conter no mínimo 6 caracteres.")
        .required("Insira seu nome completo."),
      email: Yup.string().email("Email inválido").required("Insira seu email"),
      password: Yup.string()
        .min(6, "Sua senha deve conter no mínimo 6 caracteres.")
        .required("Insira sua senha."),
      repeatedPassword: Yup.string()
        .min(6, "Sua senha deve conter no mínimo 6 caracteres.")
        .oneOf([Yup.ref("password"), null], "Senhas não coincidem.")
        .required("Insira sua senha."),
    }),
    onSubmit: ({ name, email, password }) => {
      userRegister(name, email, password);
    },
  });

  const navigate = useNavigate();

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
            <RegisterForm onSubmit={handleSubmit}>
              <Input
                startIcon={<UserCircle size={30} />}
                isValidatedValue={errors.name && touched.name ? false : true}
                value={values.name}
                onChange={handleChange}
                name="name"
                placeholder="Seu nome completo"
                textError={errors.name}
                type="text"
              />
              <Input
                startIcon={<At size={30} />}
                isValidatedValue={errors.email && touched.email ? false : true}
                value={values.email}
                onChange={handleChange}
                name="email"
                textError={errors.email}
                placeholder="Email"
                type="email"
              />
              <InputPassword
                isValidatedPassword={
                  errors.password && touched.password ? false : true
                }
                password={values.password}
                onChange={handleChange}
                name="password"
                textError={errors.password}
                placeholder="Senha"
              />
              <InputPassword
                isValidatedPassword={
                  errors.repeatedPassword && touched.repeatedPassword
                    ? false
                    : true
                }
                password={values.repeatedPassword!}
                onChange={handleChange}
                name="repeatedPassword"
                textError={errors.repeatedPassword}
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
