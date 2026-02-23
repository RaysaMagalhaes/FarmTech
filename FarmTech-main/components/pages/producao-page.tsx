"use client"

import { useEffect, useState } from "react"
import { TrendingUp, Calendar, Droplets, BarChart3, Plus, MilkIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DataCard } from "@/components/ui/data-card"
import { calculeProduction, getHistoricoProducao, getLastWeekProduction, getMetasProducao, getTopProducers } from "@/app/utils/util-production"
import { HistoricoProducaoModal } from "../modais/add-ordenha-modal"
import { getAnimalInfo } from "@/app/utils/util-animals"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function ProducaoPage() {
  // const [selectedPeriod, setSelectedPeriod] = useState("semana");
  // const [dailyProductionData, setDailyProductionData] = useState([]) Deixa pra depois
  // const [weekProductionData, setWeekProductionData] = useState([]);
  // const [monthlyProductionData, setMonthlyProductionData] = useState([]) Deixa pra depois
  const [topProducersData, setTopProducersData] = useState<TopProducer[]>([]);
  const [mediaProducao, setMediaProducao] = useState("0");
  const [production, setProduction] = useState("0");
  const [openMetaModalOrdenha, setOpenMetaModalOrdenha] = useState(false);
  const [historicoProducaoData, setHistoricoProducaoData] = useState<HistoricoProducao[]>([]);
  const [lactantes, setLactantes] = useState("0");
  const [productionTrendData, setProductionTrendData] = useState<any[]>([]);


  async function loadAll() {

    const animals: AnimalData[] = await getAnimalInfo()
    setLactantes(animals.filter(animal => animal.lactante === "lactante").length.toString())


    setTopProducersData(await getTopProducers());

    const productionData = await calculeProduction();
    setMediaProducao(productionData[0].value.toString());
    setProduction(productionData[1].value.toString());
    setHistoricoProducaoData(await getHistoricoProducao());
    const trendData = await getLastWeekProduction();

    setProductionTrendData(trendData);
  }

  useEffect(() => {
    loadAll()
  }, [])


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Controle de Produção</h1>
          <p className="text-gray-600">Monitoramento da produção de leite</p>
        </div>
        <div className="flex gap-2">
          {/* <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dia">Hoje</SelectItem>
              <SelectItem value="semana">Semana</SelectItem>
              <SelectItem value="mes">Mês</SelectItem>
              <SelectItem value="ano">Ano</SelectItem>
            </SelectContent>
          </Select> */}


          <Button
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => setOpenMetaModalOrdenha(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Lançar Hordenha
          </Button>
        </div>
        <HistoricoProducaoModal
          open={openMetaModalOrdenha}
          onOpenChange={setOpenMetaModalOrdenha}
          create={true}
          onSaved={loadAll}
        />

      </div>

      {/* Production Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DataCard
          title="Produção Hoje"
          value={production + "L"}
          icon={<Droplets className="h-6 w-6 text-blue-600" />}
        />

        <DataCard
          title="Produção Semanal"
          value={parseFloat(production) * 7 + "L"}
          icon={<TrendingUp className="h-6 w-6 text-green-600" />}
          iconClassName="bg-green-100"
        />

        <DataCard
          title="Média por Animal"
          value={parseFloat(mediaProducao).toFixed(1) + "L"}
          icon={<BarChart3 className="h-6 w-6 text-purple-600" />}
          iconClassName="bg-purple-100"
        />

        <DataCard
          title="Animais em Lactação"
          value={lactantes}
          icon={<MilkIcon className="h-6 w-6 text-orange-600" />}
          iconClassName="bg-orange-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Production Chart */}
        <Card className="overflow-hidden border-t-4 border-t-blue-500">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-transparent">
            <CardTitle>Produção Semanal</CardTitle>
            <CardDescription>
              Litros de leite produzidos nos últimos 7 dias
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={productionTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dia" />
                  <YAxis dataKey="producao"/>
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="producao"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Producers */}
        <Card className="overflow-hidden border-t-4 border-t-green-500">
          <CardHeader className="bg-gradient-to-r from-green-50 to-transparent">
            <CardTitle>Maiores Produtoras</CardTitle>
            <CardDescription>Animais com melhor desempenho</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducersData.map((animal, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-green-600">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{animal.nome}</p>
                      <p className="text-sm text-gray-500">ID: {animal.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{animal.producao}</p>
                    <p className="text-sm text-gray-500">Média: {animal.meta}</p>
                  </div>
                  <div
                    className={`px-2 py-1 rounded text-xs font-medium ${animal.percentual >= 100 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                  >
                    {animal.percentual}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Production History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Produção</CardTitle>
          <CardDescription>Registro detalhado das últimas ordenhas</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Período</TableHead>
                <TableHead>Produção</TableHead>
                <TableHead>Animais Ordenhados</TableHead>
                <TableHead>Média por Animal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historicoProducaoData.map((day, index) => (
                <TableRow key={`${day.data}-${day.periodo}-${index}`}>
                  <TableCell>{new Date(day.data).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell>{day.periodo}</TableCell>
                  <TableCell>{day.producao}</TableCell>
                  <TableCell>{day.animais}</TableCell>
                  <TableCell>{day.mediaPorAnimal}L</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
