import { Tarea } from "@/interfaces/tarea";
import api from ".";

export const getTareas = async () => {
  const response = await api.get("/tareas");
  return response.data;
};

export const showTarea = async (id: number) => {
  const response = await api.get(`/tareas/${id}`);
  return response.data;
};

export const createTarea = async (data: Tarea) => {
  const response = await api.post("/tareas", data);
  return response.data;
};

export const updateTarea = async (id: number, data: Tarea) => {
  const response = await api.put(`/tareas/${id}`, data);
  return response.data;
};

export const deleteTarea = async (id: number) => {
  const response = await api.delete(`/tareas/${id}`);
  return response.data;
};