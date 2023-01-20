import styled from "styled-components";

export const Main = styled.main`
  display: flex;
  justify-content: center;
  padding: 10px 16px;
`;

export const Container = styled.div`
  max-width: 1280px;
  width: 100%;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.primary};

  display: flex;
  justify-content: center;
`;

export const Section = styled.section``;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
