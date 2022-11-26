import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API || "",
});

export const signIn = (
  email: string,
  password: string
): Promise<AxiosResponse> =>
  api.post(
    "/login",
    {},
    {
      auth: {
        username: email,
        password,
      },
    }
  );

export const signUp = (name: string, email: string, password: string) =>
  api.post("/user/register", {
    name,
    email,
    password,
  });
