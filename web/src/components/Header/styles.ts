import styled from "styled-components";

interface MenuUserProps {
  show: boolean;
}

export const HeaderMain = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

export const HeaderContainer = styled.div`
  max-width: 1280px;
  height: 100px;
  width: 100%;
  padding: 0px 16px;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  border: none;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

export const LogoName = styled.h1`
  font-size: 24px;
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const ContainerUser = styled.div`
  border-radius: 10px;
  padding: 8px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  div {
    display: flex;
    align-items: center;
    gap: 5px;
    :hover {
      cursor: pointer;
    }

    img {
      width: 50px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
`;

export const MenuUser = styled.ul<MenuUserProps>`
  display: ${({ show }) => (show ? "flex" : "none !important")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: absolute;
  width: 120px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  top: 105%;
  right: 30px;

  & hr {
    display: block;
    height: 1px;
    background-color: #c3c3c3;
    width: 100%;
  }

  & li {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 10px;
    cursor: pointer;
  }

  animation: ${({ show }) => (show ? "fadeIn" : "OutIn")} 0.5s ease-in-out;
  @keyframes fadeIn {
    from {
      margin-bottom: 500px;
      opacity: 0;
    }
    to {
      margin-bottom: 500px;
      opacity: 1;
    }
  }

  @keyframes OutIn {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;
