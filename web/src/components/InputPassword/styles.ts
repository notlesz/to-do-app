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
  padding: 10px 10px 10px 20px;
  color: ${({ isValidated, theme }) =>
    isValidated ? theme.colors.textPrimary : theme.colors.error};
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

  span {
    display: flex;
    padding: 10px;
    border-radius: 50%;
    transition: background-color 400ms ease-in-out;

    :hover {
      color: #fff;
      background-color: ${({ theme }) => theme.colors.primary};
      cursor: pointer;
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
