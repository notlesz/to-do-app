import styled, { css } from "styled-components";

interface Props {
  size: "small" | "medium" | "large";
  color: "primary" | "secondary";
}

const changeLoadingSize = {
  small: () => css`
    border: 5px solid lightgrey;
    width: 20px;
    height: 20px;
    border-top: 5px solid;
  `,
  medium: () => css`
    border: 7px solid lightgrey;
    width: 50px;
    height: 50px;
    border-top: 7px solid;
  `,
  large: () => css`
    border: 15px solid lightgrey;
    width: 80px;
    height: 80px;
    border-top: 15px solid;
  `,
};

const changeLoadingColor = {
  primary: () => css`
    border-top-color: ${({ theme }) => theme.colors.primary};
  `,
  secondary: () => css`
    border-top-color: ${({ theme }) => theme.colors.secondary};
  `,
};

const Loader = styled.span<Props>`
  ${({ size }) =>
    css`
      ${changeLoadingSize[size]()}
    `}
  ${({ color }) =>
    css`
      ${changeLoadingColor[color]()}
    `}

  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default function Loading({ size = "small", color = "primary" }: Props) {
  return <Loader size={size} color={color} />;
}
