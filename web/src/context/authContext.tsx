import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../@types/user";
import { getUserData, signIn, signUp } from "../service/api";

interface AuthContextProps {
  user: UserData | undefined;
  login: (email: string, password: string) => void;
  logout: () => void;
  userRegister: (name: string, email: string, password: string) => void;
  loading: boolean;
  errorMessage: string | null;
  clearMessage: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as any);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recoveredUser = localStorage.getItem("user");

  const navigate = useNavigate();

  const clearMessage = () => setErrorMessage(null);

  async function login(email: string, password: string) {
    try {
      setLoading(true);
      const response = await signIn(email, password);
      const { data } = await getUserData(response.data.user.id);

      setUser(data);

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(data));

      navigate("/home");
    } catch (error: any) {
      setErrorMessage(error?.response?.data);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      setLoading(false);
      navigate("/login");
    }, 3000);
  }

  async function userRegister(name: string, email: string, password: string) {
    try {
      setLoading(true);
      const { data } = await signUp(name, email, password);
      setUser(data.user);

      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/home");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
    }

    setErrorMessage(null);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        userRegister,
        clearMessage,
        loading,
        user,
        errorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
