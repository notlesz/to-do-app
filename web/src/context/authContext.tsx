import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../@types/user";
import { getUserData, signIn, signUp } from "../service/api";

interface AuthContextProps {
  user: UserData | undefined;
  token: string;
  login: (email: string, password: string) => void;
  logout: () => void;
  createUser: (name: string, email: string, password: string) => void;
  loading: boolean;
  errorMessage: string | null;
  clearMessage: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as any);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | undefined>(undefined);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recoveredToken = localStorage.getItem("token");
  const recoveredUser = localStorage.getItem("user");

  const navigate = useNavigate();

  const clearMessage = () => setErrorMessage(null);

  async function login(email: string, password: string) {
    try {
      setLoading(true);
      const responseToken = await signIn(email, password);
      const { data } = await getUserData();
      setUser(data);

      localStorage.setItem("token", JSON.stringify(responseToken.data));
      localStorage.setItem("user", JSON.stringify(data));
      console.log(token, data);
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

  async function createUser(name: string, email: string, password: string) {
    try {
      setLoading(true);
      const { data } = await signUp(name, email, password);
      setToken(data.token);
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

    if (recoveredToken) {
      setToken(JSON.parse(recoveredToken));
    }

    setErrorMessage(null);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        createUser,
        clearMessage,
        loading,
        token,
        user,
        errorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
