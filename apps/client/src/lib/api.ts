import axios from "axios";

export type ApiResponse<T> = {
  statusCode: number;
  message: string;
  data: T | null;
  error: unknown;
};

export type AuthUser = {
  id?: string;
  name: string;
  username: string;
  email: string;
  description?: string | null;
  profileBanner?: string;
  verification?: string;
  onBoarding?: string;
  lastLoggedIn?: string | null;
};

export type LoginResponse = {
  token: string;
  user: AuthUser;
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (typeof window === "undefined") return config;

  const token = window.localStorage.getItem("orca_access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
