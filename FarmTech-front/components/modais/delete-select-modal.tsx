"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface DeleteSelectModalProps {
  open: boolean;
  title: string;
  items: { id: string; label: string }[];
  onClose: () => void;
  onConfirm: (id: string) => void;
}

export function DeleteSelectModal({
  open,
  title,
  items,
  onClose,
  onConfirm,
}: DeleteSelectModalProps) {
  const [selected, setSelected] = useState<string>("");

  function handleConfirm() {
    if (!selected) return;
    onConfirm(selected);
    setSelected("");
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <Select onValueChange={setSelected}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o item para deletar" />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
