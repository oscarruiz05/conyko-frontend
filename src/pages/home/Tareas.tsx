import FormTarea from "@/components/FormTarea";
import ListaTareas from "@/components/ListaTareas";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

function Tareas() {
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [idTarea, setIdTarea] = useState<number | null>(null);

  const editTarea = (id: number) => {
    setIdTarea(id);
    setOpen(true);
  }

  const handleSuccess = () => {
    setOpen(false);
    setIdTarea(null);
    setRefresh((prev) => !prev);
  };

  const handleModalClose = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) setIdTarea(null);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleModalClose}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-bold mb-4">Mis Tareas</h1>
            <DialogTrigger asChild>
              <Button>Nueva Tarea</Button>
            </DialogTrigger>
          </div>
          <ListaTareas refresh={refresh} onEditTarea={editTarea} />
        </div>
        <FormTarea id={idTarea} isOpen={open} onSuccess={handleSuccess} />
      </Dialog>
    </>
  );
}

export default Tareas;
