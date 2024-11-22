import { Tarea } from "@/interfaces/tarea";
import {
  createTarea,
  deleteTarea,
  getTareas,
  showTarea,
  updateTarea,
} from "@/services/tareas";
import { useState } from "react";
import { useToast } from "./use-toast";

const useTarea = () => {
  const [loading, setLoading] = useState(false);
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const { toast } = useToast();

  const listarTareas = async () => {
    setLoading(true);
    try {
      const { data } = await getTareas();
      setTareas(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        description: "Ha ocurrido un error al listar las tareas",
        variant: "destructive",
      });
    }
  };

  const verTarea = async (id: number) => {
    setLoading(true);
    try {
      const { data } = await showTarea(id);
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      toast({
        description: "Ha ocurrido un error al actualizar la tarea",
        variant: "destructive",
      });
    }
  };

  const crearTarea = async (tarea: Tarea) => {
    setLoading(true);
    try {
      const { data } = await createTarea(tarea);
      toast({
        description: `La tarea ${data.nombre} ha sido creada exitosamente`,
        variant: "default",
      });
      setLoading(false);
    } catch (error) {
      toast({
        description: "Ha ocurrido un error al crear la tarea",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
  };

  const actualizarTarea = async (id: number, tarea: Tarea) => {
    setLoading(true);
    try {
      await updateTarea(id, tarea);
      toast({
        description: `Tarea actualizada exitosamente`,
        variant: "default",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        description: "Ha ocurrido un error al actualizar la tarea",
        variant: "destructive",
      });
    }
  };

  const eliminarTarea = async (id: number) => {
    setLoading(true);
    try {
      await deleteTarea(id);
      toast({
        description: `Tarea eliminada exitosamente`,
        variant: "default",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        description: "Ha ocurrido un error al eliminar la tarea",
        variant: "destructive",
      });
    }
  };

  return {
    loading,
    tareas,
    listarTareas,
    verTarea,
    crearTarea,
    actualizarTarea,
    eliminarTarea,
  };
};

export default useTarea;
