import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

interface Props {
  children: ReactNode;
}

export default function PrivateRoute({ children }: Props) {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  return token && user ? <>{children}</> : <Navigate to="/" />;
}
