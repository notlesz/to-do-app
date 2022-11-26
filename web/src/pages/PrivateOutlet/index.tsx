import { Navigate, Outlet } from "react-router-dom";

export default function PrivateOutlet() {
  const auth = false;
  return auth ? <Outlet /> : <Navigate to="/" />;
}
