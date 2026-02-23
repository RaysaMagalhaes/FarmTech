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
import { useState } from "react";
import { createUpcomingVaccination } from "@/app/utils/util-saude";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved:() => void;
};

export function AgendarVacinacaoModal({
  open,
  onOpenChange,
  onSaved
}: Props) {
  const [quantidadeAnimais, setAnimal] = useState("");
  const [vacina, setVacina] = useState("");
  const [veterinario, setVeterinario] = useState("");
  const [data, setData] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  async function saveVaccination() {
    try {
      const body: UpcomingVaccinations = {
        quantidadeAnimais,
        vacina,
        data,
        veterinario,
      };

      await createUpcomingVaccination(body);

      onSaved();
      onOpenChange(false);

      // reset opcional
      setAnimal("");
      setVacina("");
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
          <DialogTitle>Agendar Vacinação</DialogTitle>
        </DialogHeader>

        {/* Nome do Animal */}
        <div>
          <Label>Animal</Label>
          <Input
            placeholder="Quantidade de Animais"
            value={quantidadeAnimais}
            onChange={(e) => setAnimal(e.target.value)}
          />
        </div>

        {/* Vacina */}
        <div>
          <Label>Vacina</Label>
          <Input
            placeholder="Ex: Brucelose, Febre Aftosa..."
            value={vacina}
            onChange={(e) => setVacina(e.target.value)}
          />
        </div>

        {/* Veterinário */}
        <div>
          <Label>Veterinário</Label>
          <Input
            placeholder="Nome do veterinário"
            value={veterinario}
            onChange={(e) => setVeterinario(e.target.value)}
          />
        </div>

        {/* Data */}
        <div>
          <Label>Data</Label>
          <Input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={saveVaccination}
          >
            Agendar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
