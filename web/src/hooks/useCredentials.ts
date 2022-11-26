import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../@types/user";
import { signIn, signUp } from "../service/api";

export function useCredentials() {
  const [user, setUser] = useState<UserData>();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("credentials");
  const navigate = useNavigate();

  async function login(email: string, password: string) {
    try {
      setLoading(true);
      const { data } = await signIn(email, password);
      localStorage.setItem("credentials", data);
      navigate("/home");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("credentials");
      setLoading(false);
      navigate("/login");
    }, 3000);
  }

  async function createUser(name: string, email: string, password: string) {
    try {
      setLoading(true);
      const { data } = await signUp(name, email, password);
      setUser(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return { login, logout, createUser, loading, token, user };
}
