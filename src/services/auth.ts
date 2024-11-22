import { Login, Register } from "@/interfaces/auth";
import api from ".";

export const login = async (data: Login) => {
  const response = await api.post("/login", data);
  return response.data;
};

export const register = async (data: Register) => {
  const response = await api.post("/registro", data);
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/logout");
  return response.data;
};
