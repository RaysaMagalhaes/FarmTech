import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddFeedPlanProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: {
    categoria: string;
    qtdAnimais: string;
    qtdRacao: string;
    prcRacao:string;
    pastagem: string;
    qtdVolumoso: string;
    prcVolumoso:string; 
  }) => void;
}

export function AddFeedPlan({ open, onClose, onAdd }: AddFeedPlanProps) {
  const [categoria, setCategoria] = useState("");
  const [qtdAnimais, setQtdAnimais] = useState("");
  const [qtdRacao, setQtdRacao] = useState("");
  const [prcRacao, setPrcRacao] = useState("");
  const [qtdVolumoso, setVolumoso] = useState("");
  const [prcVolumoso, setPrcVolumoso] = useState("");
  const [pastagem, setPastagem] = useState("");


  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onAdd({categoria, qtdAnimais, qtdRacao, qtdVolumoso, pastagem, prcRacao,prcVolumoso  });
    setCategoria("");
    setQtdAnimais("");
    setQtdRacao("");
    setPrcRacao("");
    setVolumoso("");
    setPrcVolumoso("");
    setPastagem("");
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Plano Nutricional</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="Categoriia">Categoria de Animais</Label>
            <Input
              id="Categoriia"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="Animais">Quantidade de Animais</Label>
            <Input
              id="Animais"
              type="number"
              value={qtdAnimais}
              onChange={(e) => setQtdAnimais(e.target.value)}
              required
            />
          </div>
          <TooltipProvider>
            <div>
              <Label htmlFor="racao">Quantidade de Ração (Kg)</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Input id="racao" type="number" placeholder="Ex: 5" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Informe a quantidade de ração diária por animal.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div>
              <Label htmlFor="prcRacao">Custo do Kg de Ração Oferecida (R$)</Label>
              <Input
                id="prcRacao"
                value={prcRacao}
                onChange={(e) => setPrcRacao(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="volumoso">Quantidade de Volumoso (Kg)</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Input id="volumoso" type="number" placeholder="Ex: 15" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Informe a quantidade de volumoso (ex: silagem, capim) por
                    animal.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div>
            <Label htmlFor="prcVolumoso">Custo do Kg de Volumoso oferecido (R$)</Label>
            <Input
              id="prcVolumoso"
              value={prcVolumoso}
              onChange={(e) => setPrcVolumoso(e.target.value)}
              required
            />
          </div>
          </TooltipProvider>
          <div>
            <Label htmlFor="Pastagem">Rotaciona no Pasto</Label>
            <select
              id="Pastagem"
              value={pastagem}
              onChange={(e) => setPastagem(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:ring-green-500"
            >
              <option value="">Selecione...</option>
              <option value="Pendente">Sim</option>
              <option value="Concluído">Não</option>
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
