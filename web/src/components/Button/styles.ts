import styled from "styled-components";

export const CustomButton = styled.button<{ variant: "contained" | "text" | "outlined" }>`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 5px 10px;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
