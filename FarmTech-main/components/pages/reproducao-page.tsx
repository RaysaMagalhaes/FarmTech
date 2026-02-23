import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { DataCard } from "@/components/ui/data-card"
import { use, useEffect, useState } from "react"
import { Baby, Calendar, Clock, Heart } from "lucide-react";
import { basicDadosPrenhhez, animaisPrenhas, inseminationSchedule } from "@/app/utils/util-reproducao";


export default function ReproducaoPage() {
  
  const [reproductionStats, setReproductionStats] = useState<any[]>([]);
  const [taxaPrenhez, setTaxaPrenhez] = useState<any>(null);
  const [pregnantCows,setPengrantCows] = useState<PengrantCows[]>([]);
  const [inseminationSchedul, setInseminationSchedule] = useState<InseminationSchedule[]>([]);

  async function loadall() {
    const data = await basicDadosPrenhhez();
    setTaxaPrenhez(data.taxa);
    setReproductionStats(data.statusData);
    const prenhas = await animaisPrenhas();
    setPengrantCows(prenhas);
    const schedule = await inseminationSchedule();
    setInseminationSchedule(schedule);
  }

  useEffect(() => {
    loadall();
  }, []);

  

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Controle Reprodutivo</h1>
          <p className="text-gray-600">Gestão de reprodução e melhoramento genético</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Agendar Inseminação
          </Button>
          <Button className="bg-pink-600 hover:bg-pink-700">
            <Heart className="mr-2 h-4 w-4" />
            Registrar Cio
          </Button>
        </div>
      </div>

      {/* Reproductive Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DataCard
          title="Animais Prenhas"
          value={reproductionStats.find(item => item.status === "Prenhas")?.count || 0}
          icon={<Baby className="h-6 w-6 text-pink-600" />}
          iconClassName="bg-pink-100"
        />
        <DataCard
          title="Partos Esperados"
          value={reproductionStats.find(item => item.status === "Pré-Natal")?.count || 0}
          icon={<Calendar className="h-6 w-6 text-blue-600" />}
          iconClassName="bg-blue-100"
        />
        <DataCard
          title="Taxa de Prenhez"
          value={taxaPrenhez + "%"}
          icon={<Heart className="h-6 w-6 text-green-600" />}
          iconClassName="bg-green-100"
        />
        <DataCard
          title="Inseminações Agendadas"
          value={reproductionStats.find(item => item.status === "Inseminação Agendada")?.count || 0}
          icon={<Clock className="h-6 w-6 text-purple-600" />}
          iconClassName="bg-purple-100"
        />
      </div>

      {/* Performance Indicators */}
      <Card>
        <CardHeader>
          <CardTitle>Indicadores Reprodutivos</CardTitle>
          <CardDescription>Métricas de desempenho reprodutivo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full border rounded-xl p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={reproductionStats}
                margin={{ top: 20, right: 40, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="status"
                  padding={{ left: 30, right: 30 }} // espaço lateral
                />

                <YAxis
                  allowDecimals={false} // 👈 limite fixo até 25
                />

                <Tooltip
                  formatter={(value: number) => [
                    `${value} vacas`,
                    "Quantidade",
                  ]}
                />

                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>


        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pregnant Cows */}
        <Card>
          <CardHeader>
            <CardTitle>Animais Prenhes</CardTitle>
            <CardDescription>Acompanhamento da gestação</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
              {pregnantCows.map((cow, index) => (
                <div key={index} className="p-3 bg-pink-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">
                        {cow.nome} (ID: {cow.id})
                      </p>
                      <p className="text-sm text-gray-600">Gestação: {cow.diasGestacao} dias</p>
                    </div>
                    <Badge
                      variant={cow.status === "Normal" ? "default" : "secondary"}
                      className={
                        cow.status === "Normal" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {cow.status}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    {/* <p>Inseminação: {new Date(cow.inseminacao).toLocaleDateString("pt-BR")}</p> */}
                    <p>Previsão Parto: {new Date(cow.previsaoParto).toLocaleDateString("pt-BR")}</p>
                  </div>
                  <Progress value={(cow.diasGestacao / 280) * 100} className="h-2 mt-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Births */}
        <Card>
          <CardHeader>
            <CardTitle>Próximos Partos</CardTitle>
            <CardDescription>Preparação para nascimentos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
              {pregnantCows.map((birth, index) => (
                <div key={index} className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">
                        {birth.nome} (ID: {birth.id})
                      </p>
                      <p className="text-sm text-gray-600">{280 - birth.diasGestacao} dias restantes</p>
                    </div>
                    <Badge
                      variant={
                        birth.preparacao === "Completa"
                          ? "default"
                          : birth.preparacao === "Em Andamento"
                            ? "secondary"
                            : "outline"
                      }
                      className={
                        birth.preparacao === "Completa"
                          ? "bg-green-100 text-green-800"
                          : birth.preparacao === "Em Andamento"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }
                    >
                      {birth.preparacao}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Previsão: {new Date(birth.previsaoParto).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insemination Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Cronograma de Inseminação</CardTitle>
          <CardDescription>Controle de cio e inseminação artificial</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Animal</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Último Cio</TableHead>
                <TableHead>Próximo Cio Previsto</TableHead>
                <TableHead>Status de Prenhez</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inseminationSchedul.map((schedule, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{schedule.nome}</TableCell>
                  <TableCell>{schedule.id}</TableCell>
                  <TableCell>{new Date(schedule.ultimoCio).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell>{new Date(schedule.proximoCio).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        schedule.statusPrenhez === "prenha" ? "default" : "outline"
                      }
                      className={
                        schedule.statusPrenhez === "prenha"
                          ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                          : schedule.statusPrenhez === "prenatal" ? "bg-purple-100 text-purple-800"
                            : schedule.statusPrenhez === "agendada" ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                      }
                    >
                      {schedule.statusPrenhez === "prenha" ? "Prenha"
                        : schedule.statusPrenhez === "vazia" ? "Vazia"
                          : schedule.statusPrenhez === "agendada" ? "Inseminação Agendada"
                            : schedule.statusPrenhez === "prenatal" ? "Pré-Natal"
                              : "N/A"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        schedule.status === "Programada"
                          ? "default"
                          : schedule.status === "Aguardando"
                            ? "secondary"
                            
                            : "outline"
                      }
                      className={
                        schedule.status === "Programada"
                          ? "bg-green-100 text-green-800"
                          : schedule.status === "Aguardando"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                      }
                    >
                      {schedule.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
