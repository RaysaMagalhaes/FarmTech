"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createVeterinaryVisit, updateRecord } from "@/app/utils/util-saude";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/services/calc/Saude/calc";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
  create: boolean;
  record?: VeterinaryVisit;
};

export function AgendarConsultaModal({ open, onOpenChange, onSaved, record, create }: Props) {
  const [veterinario, setVeterinario] = useState("");
  const [animais, setAnimais] = useState("");
  const [motivo, setMotivo] = useState("");
  const [custo, setCusto] = useState("");
  const [data, setData] = useState<string>(
    new Date().toISOString().split("T")[0] // sempre começa com uma string válida
  );



  useEffect(() => {
    if (!open) return;

    if (create) {
      setVeterinario("");
      setMotivo("");
      setCusto("");
      setData(new Date().toISOString().split("T")[0]);
      return;
    }

    if (!record) return;
    console.log("Editando visita:", record);
    setVeterinario(record.veterinario);
    const formattedDate = new Date(record.data).toISOString().split("T")[0];
    setData(formattedDate);
    setMotivo(record.motivo);
    setCusto(record.custo);
    setAnimais(record.animais);


  }, [record, open, create]);

  async function saveVisit() {
    try {
      const body: VeterinaryVisit = {
        data,
        veterinario,
        motivo,
        animais,
        custo
      };
      if (create) {
        await createVeterinaryVisit(body);
      } else {
        await updateRecord("VisitasVeterinarias", record?.firebaseKey || "", body);
      }
      onSaved();
      onOpenChange(false);

      // reset opcional
      setCusto("");
      setAnimais("");
      setMotivo("");
      setVeterinario("");
      setData(new Date().toISOString().split("T")[0]);

    } catch (error) {
      console.error("Erro ao agendar vacinação:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agendar Consulta Veterinária</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Data</Label>
            <Input type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>

          <div>
            <Label>Veterinário</Label>
            <Input placeholder="Nome do veterinário"
              value={veterinario}
              onChange={(e) => setVeterinario(e.target.value)} />

          </div>

          <div>
            <Label>Motivo</Label>
            <Input placeholder="Ex: Vacinação, exame, tratamento..."
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)} />
          </div>

          <Input
            placeholder="R$ 0,00"
            value={custo}
            onChange={(e) => {
              const formatted = formatCurrency(e.target.value);
              setCusto(formatted);
            }}
          />


          <div>
            <Label>Quantidade de Animais</Label>
            <Input type="number" min={1}
              value={animais}
              onChange={(e) => setAnimais(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button className="bg-red-600 hover:bg-red-700" onClick={saveVisit}>
            Agendar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}