import styled from "styled-components";

export const LoginMain = styled.main`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  animation: fadeInLogin 0.5s ease-in-out;

  @keyframes fadeInLogin {
    from {
      opacity: 0;
      margin-right: 500px;
    }
    to {
      opacity: 1;
      margin-right: 0px;
    }
  }
`;

export const LoginContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 20px;
  background-color: #fff;

  max-width: 1250px;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const LoginSection = styled.section`
  padding-top: 60px;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  border-radius: 0px 20px 20px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;

  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const LoginTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 30px;
`;

export const LoginSubTitle = styled.h3`
  font-size: 28px;
  margin-bottom: 44px;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ContainerActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 18px;
`;

export const CreateAccount = styled.p`
  font-size: 16px;
  cursor: pointer;
`;

export const LoginSubmitButton = styled.button`
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  font-size: 20px;
  color: #fff;
  font-weight: 600;

  width: 130px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-self: flex-end;

  background-color: ${({ theme }) => theme.colors.primary};

  padding: 10px 18px;

  transition: background-color 300ms ease;

  :hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const BoxLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
