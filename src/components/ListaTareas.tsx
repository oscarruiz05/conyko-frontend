import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit2, Trash2 } from "lucide-react";
import useTarea from "@/hooks/useTarea";
import Loader from "@/components/Loader";
import { Tarea } from "@/interfaces/tarea";

interface ListaTareasProps {
  refresh: boolean;
  onEditTarea: (id: number) => void;
}

function ListaTareas({ refresh, onEditTarea }: ListaTareasProps): React.ReactElement {
  const { loading, tareas, listarTareas, actualizarTarea, eliminarTarea } = useTarea();

  useEffect(() => {
    listarTareas();
  }, [refresh]);

  const updateTarea = (id: number) => {
    onEditTarea(id);
  };

  const completarTarea = async (tarea: Tarea) => {
    await actualizarTarea(tarea.id as number, { ...tarea, completada: !tarea.completada });
    tareas.find((t) => t.id === tarea.id)!.completada = !tarea.completada;
  };

  const deletetarea = async (id: number) => {
    await eliminarTarea(id);
    await listarTareas();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {loading && <Loader />}
      {!loading &&
        tareas.map((tarea) => (
          <Card
            key={tarea.id}
            className={tarea.completada ? "bg-green-50" : ""}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <Checkbox
                  checked={tarea.completada}
                  onCheckedChange={() => completarTarea(tarea)}
                />
                <span className={tarea.completada ? "line-through" : ""}>
                  {tarea.nombre}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span>{tarea.descripcion}</span>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                size="icon"
                onClick={() => updateTarea(tarea.id as number)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => deletetarea(tarea.id as number)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
}

export default ListaTareas;
