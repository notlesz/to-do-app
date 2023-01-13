import { CaretDown } from "phosphor-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import {
  ContainerUser,
  HeaderContainer,
  HeaderMain,
  LogoName,
  MenuUser,
} from "./styles";

export default function Header() {
  const { user } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  return (
    <HeaderMain>
      <HeaderContainer>
        <LogoName to="/home">
          <h1>TESTE</h1>
        </LogoName>
        <ContainerUser>
          <p>{user?.name}</p>
          <div onClick={() => setShowMenu((state) => !state)}>
            <img src={user?.profilePicture} alt="" />
            <CaretDown size={25} />
          </div>
          <MenuUser show={showMenu} />
        </ContainerUser>
      </HeaderContainer>
    </HeaderMain>
  );
}
