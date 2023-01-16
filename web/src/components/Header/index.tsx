import { CaretDown, CaretUp, SignOut, UserCircle } from "phosphor-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Loading from "../Loading";
import { ContainerUser, HeaderContainer, HeaderMain, LogoName, MenuUser } from "./styles";

export default function Header() {
  const { user, logout, loading } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  return (
    <HeaderMain>
      <HeaderContainer>
        <LogoName to='/home'>
          <h1>ToDoDev</h1>
        </LogoName>
        <ContainerUser>
          <p>{user?.name}</p>
          <div onClick={() => setShowMenu((state) => !state)}>
            <img src={user?.profilePicture} alt='' />
            {showMenu ? <CaretUp size={20} /> : <CaretDown size={20} />}
          </div>
          <MenuUser show={showMenu}>
            {loading ? (
              <Loading size='medium' color='primary' />
            ) : (
              <>
                <li>
                  Perfil
                  <UserCircle size={25} weight='fill' />
                </li>
                <hr />
                <li onClick={() => logout()}>
                  Sair
                  <SignOut size={25} weight='fill' />
                </li>
              </>
            )}
          </MenuUser>
        </ContainerUser>
      </HeaderContainer>
    </HeaderMain>
  );
}
