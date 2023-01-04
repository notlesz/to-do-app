import { useFormik } from "formik";
import { At, SignIn as IconSignIn } from "phosphor-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ImageLogin from "../../assets/image_home.svg";
import Input from "../../components/Input";
import InputPassword from "../../components/InputPassword";
import Loading from "../../components/Loading";
import { AuthContext } from "../../context/authContext";
import {
  BoxLoading,
  ContainerActions,
  CreateAccount,
  ErrorMessage,
  LoginContainer,
  LoginForm,
  LoginMain,
  LoginSection,
  LoginSubmitButton,
  LoginSubTitle,
  LoginTitle,
} from "./styles";

export default function SignIn() {
  const { login, loading, errorMessage } = useContext(AuthContext);

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Email inválido").required("Insira seu email"),
      password: Yup.string()
        .min(6, "Sua senha deve conter no mínimo 6 caracteres.")
        .required("Insira sua senha."),
    }),
    onSubmit: ({ email, password }) => {
      login(email, password);
    },
  });

  const navigate = useNavigate();

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
            <LoginSubTitle className="subtitle">Entrar</LoginSubTitle>
            <LoginForm onSubmit={handleSubmit}>
              <Input
                startIcon={<At size={32} />}
                isValidatedValue={errors.email && touched.email ? false : true}
                value={values.email}
                onChange={handleChange}
                textError={errors.email}
                placeholder="Email"
                name="email"
                type="email"
                id="email"
              />
              <InputPassword
                isValidatedPassword={
                  errors.password && touched.password ? false : true
                }
                password={values.password}
                onChange={handleChange}
                textError={errors.password}
                placeholder="Senha"
                name="password"
              />
              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
              <ContainerActions>
                <CreateAccount onClick={() => navigate("/register")}>
                  Criar conta
                </CreateAccount>
                <LoginSubmitButton type="submit">
                  Login
                  <IconSignIn size={30} />
                </LoginSubmitButton>
              </ContainerActions>
            </LoginForm>
          </LoginSection>
        )}
      </LoginContainer>
    </LoginMain>
  );
}
