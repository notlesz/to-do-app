import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Header from "../Header";

interface Props {
  children: ReactNode;
}

export default function PrivateRoute({ children }: Props) {
  const token = localStorage.getItem("token");

  return token ? (
    <>
      <Header />
      {children}
    </>
  ) : (
    <Navigate to="/" />
  );
}
