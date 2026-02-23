import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddFeedModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: { item: string; peso: string; capacidade: string; validade: string }) => void;
}

export function AddFeedModal({ open, onClose, onAdd }: AddFeedModalProps) {
  const [item, setItem] = useState("");
  const [peso, setPeso] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [validade, setValidade] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onAdd({ item, peso, capacidade, validade });
    setItem("");
    setPeso("");
    setCapacidade("");
    setValidade("");
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Alimento</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nome">Nome do Alimento</Label>
            <Input id="nome" value={item} onChange={e => setItem(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="peso">Peso Estocado (kg)</Label>
            <Input id="peso" type="number" value={peso} onChange={e => setPeso(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="capacidade">Capacidade do Estoque Maxima (kg)</Label>
            <Input id="capacidade" type="number" value={capacidade} onChange={e => setCapacidade(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="validade">Validade</Label>
            <Input id="validade" type="date" value={validade} onChange={e => setValidade(e.target.value)} required />
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