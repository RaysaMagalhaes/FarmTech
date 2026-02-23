"use client";

import { Wheat, Plus, Calendar, Scale, Pencil, Trash } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DataCard } from "@/components/ui/data-card";
import { useEffect, useState } from "react";

import { AddFeedModal } from "../modais/add-feed-modal";
import { AddFeedSchedule } from "../modais/add-feed-schedule";
import { AddFeedPlan } from "../modais/add-feed-plan";
import { DeleteSelectModal } from "../modais/delete-select-modal";

import {
  calculaConsumoTotal,
  calculaCustoDiario,
  calculaMediaAnimal,
  deleteAlimentacaoRecord,
  getFoodPlan,
  getFoodSchedule,
  getFeedStock,
  createFoodPlan,
  createFoodSchedule,
  createFeedStock,
} from "@/app/utils/util-alimentos";

export default function AlimentacaoPage() {
  const [stockModalOpen, setStockModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [planModalOpen, setPlanModalOpen] = useState(false);

  const [deleteStockOpen, setDeleteStockOpen] = useState(false);
  const [deleteScheduleOpen, setDeleteScheduleOpen] = useState(false);
  const [deletePlanOpen, setDeletePlanOpen] = useState(false);

  const [feedStock, setFeedStock] = useState<any[]>([]);
  const [feedingSchedule, setFeedingSchedule] = useState<any[]>([]);
  const [nutritionPlan, setNutritionPlan] = useState<any[]>([]);

  const [custoDiario, setCustoDiario] = useState(0);
  const [consumo, setConsumo] = useState(0);
  const [media, setMedia] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setFeedStock(await getFeedStock());
      setFeedingSchedule(await getFoodSchedule());
      setNutritionPlan(await getFoodPlan());
      setCustoDiario(await calculaCustoDiario());
      setConsumo(await calculaConsumoTotal());
      setMedia(await calculaMediaAnimal());
    }
    fetchData();
  }, []);

  function handleAddFeed(data: any) {
    setFeedStock((prev) => [
      ...prev,
      {
        ...data,
        percentual:
          (parseFloat(data.peso) / parseFloat(data.capacidade)) * 100,
      },
    ]);
    createFeedStock(data);
    setStockModalOpen(false);
  }

  function handleFeedingSchedule(data: any) {
    setFeedingSchedule((prev) => [...prev, data]);
    createFoodSchedule(data);
    setScheduleModalOpen(false);
  }

  function handleNutritionPlan(data: any) {
    setNutritionPlan((prev) => [...prev, data]);
    createFoodPlan(data);
    setPlanModalOpen(false);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Gestão de Alimentação</h1>
        <p className="text-gray-600">
          Controle nutricional e estoque de alimentos
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DataCard
          title="Custo Diário"
          value={custoDiario.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
          icon={<Scale className="h-6 w-6 text-green-600" />}
        />
        <DataCard
          title="Consumo Total"
          value={`${consumo.toFixed(2)} Kg`}
          icon={<Wheat className="h-6 w-6 text-blue-600" />}
        />
        <DataCard
          title="Média por Animal"
          value={`${media.toFixed(2)} Kg`}
          icon={<Scale className="h-6 w-6 text-purple-600" />}
        />
        <DataCard
          title="Estoque Médio"
          value="15 dias"
          icon={<Calendar className="h-6 w-6 text-orange-600" />}
        />
      </div>

      {/* Estoque */}
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle>Estoque de Alimentos</CardTitle>
            <CardDescription>Controle de quantidade</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setStockModalOpen(true)}>
              <Plus />
            </Button>
            <Button onClick={
              () => {
                setDeleteStockOpen(true)
                deleteAlimentacaoRecord("Estoque","");
              }} variant="destructive">
              <Trash />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {feedStock.map((item, index) => (
            <div key={index} className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="font-medium">{item.item}</span>
                <span className="text-sm text-gray-500">
                  {new Date(item.validade).toLocaleDateString("pt-BR")}
                </span>
              </div>
              <Progress
                value={(item.peso / item.capacidade) * 100}
                className="h-2"
              />
              <div className="text-sm text-gray-600 flex justify-between">
                <span>
                  {item.peso}Kg / {item.capacidade}Kg
                </span>
                <span>
                  {((item.peso / item.capacidade) * 100).toFixed(2)}%
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Cronograma */}
      <Card>
        <CardHeader className="flex justify-between">
          <CardTitle>Cronograma de Alimentação</CardTitle>
          <div className="flex gap-2">
            <Button onClick={() => setScheduleModalOpen(true)}>
              <Plus />
            </Button>
            <Button
              onClick={() => {
                setDeleteScheduleOpen(true)
                deleteAlimentacaoRecord("Cronograma","")
              }}
              variant="destructive"
            >
              <Trash />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {feedingSchedule.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-50 p-3 rounded mb-2"
            >
              <div>
                <p className="font-medium">{item.alimento}</p>
                <p className="text-sm text-gray-500">{item.horario}</p>
                <p className="text-xs text-gray-400">
                  Responsável: {item.responsavel}
                </p>
              </div>
              <Badge>{item.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Plano Nutricional */}
      <Card>
        <CardHeader className="flex justify-between">
          <CardTitle>Plano Nutricional</CardTitle>
          <div className="flex gap-2">
            <Button onClick={() => setPlanModalOpen(true)}>
              <Plus />
            </Button>
            <Button
              onClick={() => {
                setDeletePlanOpen(true);
                deleteAlimentacaoRecord("Plano","")
              }} variant="destructive">
              <Trash />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Categoria</TableHead>
                <TableHead>Nº Animais</TableHead>
                <TableHead>Ração</TableHead>
                <TableHead>Volumoso</TableHead>
                <TableHead>Custo/Dia</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nutritionPlan.map((plan, index) => (
                <TableRow key={index}>
                  <TableCell>{plan.categoria}</TableCell>
                  <TableCell>{plan.qtdAnimais}</TableCell>
                  <TableCell>{plan.qtdRacao}</TableCell>
                  <TableCell>{plan.qtdVolumoso}</TableCell>
                  <TableCell>
                    {(
                      (parseFloat(plan.prcRacao) * parseFloat(plan.qtdRacao) +
                        parseFloat(plan.prcVolumoso) *
                        parseFloat(plan.qtdVolumoso)) *
                      parseFloat(plan.qtdAnimais)
                    ).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* MODAIS */}
      <AddFeedModal
        open={stockModalOpen}
        onClose={() => setStockModalOpen(false)}
        onAdd={handleAddFeed}
      />

      <AddFeedSchedule
        open={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        onAdd={handleFeedingSchedule}
      />

      <AddFeedPlan
        open={planModalOpen}
        onClose={() => setPlanModalOpen(false)}
        onAdd={handleNutritionPlan}
      />

      <DeleteSelectModal
        open={deleteStockOpen}
        title="Deletar alimento do estoque"
        onClose={() => setDeleteStockOpen(false)}
        items={feedStock.map((item, i) => ({
          id: i.toString(),
          label: item.item,
        }))}
        onConfirm={(id) =>
          setFeedStock((prev) => prev.filter((_, i) => i.toString() !== id))
        }
      />

      <DeleteSelectModal
        open={deleteScheduleOpen}
        title="Deletar item do cronograma"
        onClose={() => setDeleteScheduleOpen(false)}
        items={feedingSchedule.map((item, i) => ({
          id: i.toString(),
          label: `${item.alimento} - ${item.horario}`,
        }))}
        onConfirm={(id) =>
          setFeedingSchedule((prev) =>
            prev.filter((_, i) => i.toString() !== id)
          )
        }
      />

      <DeleteSelectModal
        open={deletePlanOpen}
        title="Deletar plano nutricional"
        onClose={() => setDeletePlanOpen(false)}
        items={nutritionPlan.map((item, i) => ({
          id: i.toString(),
          label: item.categoria,
        }))}
        onConfirm={(id: string) =>
          setNutritionPlan((prev) =>
            prev.filter((_, i) => i.toString() !== id)
          )
        }
      />
    </div>
  );
}
