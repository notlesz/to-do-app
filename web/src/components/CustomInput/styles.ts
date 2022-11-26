import styled from "styled-components";

interface InputProps {
  isValidated: boolean;
}

export const Input = styled.div<InputProps>`
  width: 443px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #fff;
  color: ${({ isValidated, theme }) =>
    isValidated ? theme.colors.textPrimary : theme.colors.error};
  padding: 20px;
  border: 1px solid
    ${({ isValidated, theme }) =>
      isValidated ? "transparent" : theme.colors.error};
  input {
    width: 100%;
    align-self: stretch;
    font-family: ${({ theme }) => theme.fontFamily.poppins};
    font-size: 18px;
    :focus {
      outline: none !important;
      border-color: transparent;
    }
  }
`;

export const HelperTextError = styled.span`
  display: block;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.error};
  margin-top: 5px;
  margin-left: 10px;
`;
