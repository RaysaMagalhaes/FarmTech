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
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { createHealthRecord, updateRecord } from "@/app/utils/util-saude";
import { updateAnimal } from "@/app/utils/util-animals";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  animals: BasicAnimal[]
  record?: HealthRecord;
  create: boolean
  onSaved: () => void;
};

export function RegistrarOcorrenciaModal({ open, onOpenChange, animals, onSaved, record, create }: Props) {

  const [selectedAnimal, setSelectedAnimal] = useState<BasicAnimal>();
  const [problema, setProblema] = useState("");
  const [tratamento, setTratamento] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [status, setStatus] = useState<"Em Observação" | "Em Tratamento" | "Saudavel">("Em Observação");
  const [dataInicio, setDataInicio] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  async function saveRegister() {

    try {
      if (selectedAnimal?.firebaseKey) {
        const res = await updateAnimal(selectedAnimal?.firebaseKey, {
          statusSaude: status,
        });
      }
      const body2: HealthRecord = {
        animal: selectedAnimal?.nome || "",
        id: selectedAnimal?.id || "",
        problema: problema,
        tratamento: tratamento,
        inicio: dataInicio,
        status: status,
        observacoes: observacoes,
      }

      if (create) {
        const res2 = await createHealthRecord(body2);
      } else {
        const res2 = await updateRecord("HealthRecords", record?.firebaseKey || "", body2);
      }

      onSaved();
      onOpenChange(false)
    } catch (errror) {
      console.log("Erro de erro mesmo")
    }
  }

  useEffect(() => {
    if (!open) return;

    if (create) {
      setSelectedAnimal(undefined);
      setProblema("");
      setTratamento("");
      setObservacoes("");
      setDataInicio(new Date().toISOString().split("T")[0]);
      return;
    }

    if (!record || !animals.length) return;

    const animal = animals.find(
      (a) => a.id === record.id
    );

    if (!animal) return;

    setSelectedAnimal(animal);
    setDataInicio(record.inicio);
    setProblema(record.problema);
    setTratamento(record.tratamento);
    setObservacoes(record.observacoes ?? "");

  }, [record, animals, open, create]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar Ocorrência de Saúde</DialogTitle>
        </DialogHeader>

        <div>
          <Label>Animal</Label>
          <select
            className="w-full border rounded-md p-2"
            value={selectedAnimal?.id || ""}
            onChange={(e) => {
              const animal = animals.find(a => a.id === e.target.value);
              setSelectedAnimal(animal || undefined);
            }}
          >
            <option value="">Selecione um animal</option>
            {animals.map((animal) => (
              <option key={animal.id} value={animal.id}>
                {animal.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label>ID</Label>
          <Input readOnly value={selectedAnimal?.id || ""} />
        </div>

        <div>
          <Label>Problema</Label>
          <Input
            placeholder="Ex: Mastite, claudicação..."
            value={problema}
            onChange={(e) => setProblema(e.target.value)}
          />
        </div>

        <div>
          <Label>Tratamento</Label>
          <Input
            placeholder="Ex: Antibiótico"
            value={tratamento}
            onChange={(e) => setTratamento(e.target.value)}
          />
        </div>

        <div>
          <label>Data de Início</label>
          <Input
            type="date"
            value={
              dataInicio ||
              new Date().toISOString().split("T")[0]
            }
            onChange={(e) => setDataInicio(e.target.value)}
          />
        </div>
        <div>
          <Label>Status</Label>
          <select
            className="w-full border rounded-md p-2"
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
          >
            <option value="Em Observação">Em Observação</option>
            <option value="Em Tratamento">Em Tratamento</option>
            <option value="Saudavel">Saudável</option>
          </select>
        </div>

        <div>
          <Label>Observações</Label>
          <Textarea
            placeholder="Informações adicionais..."
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
          />
        </div>


        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button className="bg-red-600 hover:bg-red-700" onClick={saveRegister}>
            Registrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  );
}