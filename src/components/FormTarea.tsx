import React, { useEffect, useState } from "react";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useTarea from "@/hooks/useTarea";

interface FormProps {
  id?: number | null;
  onSuccess: () => void;
  isOpen: boolean;
}

function FormTarea({
  id = null,
  onSuccess,
  isOpen,
}: FormProps): React.ReactElement {
  const { loading, crearTarea, actualizarTarea, verTarea } = useTarea();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [completada, setCompletada] = useState("false");

  useEffect(() => {
    const fetchTarea = async () => {
      if (id) {
        const fetchedTarea = await verTarea(id);
        if (fetchedTarea) {
          setNombre(fetchedTarea?.nombre || "");
          setDescripcion(fetchedTarea?.descripcion || "");
          setCompletada(fetchedTarea?.completada ? "true" : "false");
        }
      } else {
        setNombre("");
        setDescripcion("");
        setCompletada("false");
      }
    };

    fetchTarea();
  }, [id]);

  const resetForm = () => {
    setNombre("");
    setDescripcion("");
    setCompletada("false");
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      nombre,
      descripcion,
      completada: JSON.parse(completada),
    };

    if (id) {
      await actualizarTarea(id, data);
    } else {
      await crearTarea(data);
    }

    resetForm();
    onSuccess();
  };

  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-center">
              {id ? "Editar" : "Crear"} Tareas
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input
                id="nombre"
                className="col-span-3"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="name" className="text-right">
                Descripcion
              </Label>
              <Textarea
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              />
            </div>
            {id && (
              <div className="mb-4">
                <Label htmlFor="name" className="text-right">
                  Estado
                </Label>
                <Select
                  value={completada}
                  onValueChange={(e) => setCompletada(e)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Seleccione</SelectLabel>
                      <SelectItem value="false">Pendiente</SelectItem>
                      <SelectItem value="true">Finalizado</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              Guardar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </>
  );
}

export default FormTarea;
