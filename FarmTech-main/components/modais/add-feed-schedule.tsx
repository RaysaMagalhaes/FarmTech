import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddFeedScheduleProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: { alimento: string; peso: string; responsavel: string; horario: string; status: string }) => void;
}

export function AddFeedSchedule({ open, onClose, onAdd }: AddFeedScheduleProps) {
  const [alimento, setAlimento] = useState("");
  const [peso, setPeso] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [horario, sethorario] = useState("");
  const [status, setStatus] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onAdd({ alimento, peso, responsavel, horario, status });
    setAlimento("");
    setPeso("");
    setResponsavel("");
    sethorario("");
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Cronograma</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nome">Nome do Alimento</Label>
            <Input id="nome" value={alimento} onChange={e => setAlimento(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="peso">Quantidade de alimento usado(kg)</Label>
            <Input id="peso" type="text" value={peso} onChange={e => setPeso(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="responsavel">Responsável</Label>
            <Input id="responsavel" type="text" value={responsavel} onChange={e => setResponsavel(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="horario">Horário</Label>
            <Input
              id="horario"
              type="text"
              maxLength={5}
              placeholder="HH:MM"
              value={horario}
              onChange={e => {
                let value = e.target.value;

                // remove tudo que não for número
                value = value.replace(/\D/g, "");

                // insere os dois pontos depois de 2 dígitos
                if (value.length > 2) {
                  value = value.slice(0, 2) + ":" + value.slice(2, 4);
                }

                // limita a 5 caracteres (HH:MM)
                if (value.length > 5) {
                  value = value.slice(0, 5);
                }

                sethorario(value);
              }}
              onBlur={() => {
                // valida se o horário é válido
                if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(horario)) {
                  alert("Horário inválido. Use o formato HH:MM (00:00 a 23:59).");
                  sethorario("");
                }
              }}
              required
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              value={status}
              onChange={e => setStatus(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:ring-green-500"
            >
              <option value="">Selecione...</option>
              <option value="Pendente">Pendente</option>
              <option value="Concluído">Concluído</option>
              <option value="Em Andamento">Em Andamento</option>
            </select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Adicionar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}