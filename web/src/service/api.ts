import axios, { AxiosResponse } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API,
});

export const signIn = (
  email: string,
  password: string
): Promise<AxiosResponse> =>
  api.post(
    "/signin",
    {},
    {
      auth: {
        username: email,
        password,
      },
    }
  );

export const signUp = (
  name: string,
  email: string,
  password: string
): Promise<AxiosResponse> =>
  api.post("/signup", {
    name,
    email,
    password,
  });

export const getUserData = (id: string): Promise<AxiosResponse> =>
  api.get(`/user/${id}`);
