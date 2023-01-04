import styled from "styled-components";
import {
  LoginContainer,
  LoginForm,
  LoginSection,
  LoginSubmitButton,
  LoginSubTitle,
  LoginTitle,
} from "../SignIn/styles";

export const RegisterMain = styled.main`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeInRegister 0.5s ease-in-out;

  @keyframes fadeInRegister {
    from {
      opacity: 0;
      margin-left: 500px;
    }
    to {
      opacity: 1;
      margin-left: 0px;
    }
  }
`;

export const RegisterContainer = styled(LoginContainer)``;

export const RegisterSection = styled(LoginSection)`
  padding: 60px 0px;
`;
export const RegisterForm = styled(LoginForm)``;

export const RegisterTitle = styled(LoginTitle)``;

export const RegisterSubTitle = styled(LoginSubTitle)`
  margin-bottom: 30px;
`;
export const RegisterSubmitButton = styled(LoginSubmitButton)`
  width: 140px;
`;

export const BackToLogin = styled.p`
  font-size: 18px;
  cursor: pointer;
`;

export const BoxLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: 14px;
  margin-left: 10px;
`;
