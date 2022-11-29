import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

export default function PrivateOutlet() {
  const { user, token } = useContext(AuthContext);

  const auth = user && token ? true : false;

  return auth ? <Outlet /> : <Navigate to="/" />;
}
