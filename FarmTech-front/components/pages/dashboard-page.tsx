import { MilkIcon as Cow, DollarSign, Droplets, Heart, Calendar, Wheat } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { DataCard } from "@/components/ui/data-card"
import { getAnimalInfo } from "@/app/utils/util-animals"
import { useEffect, useState } from "react"
import { calculeProduction, getLastWeekProduction } from "@/app/utils/util-production"
import { getUpcomingVaccinations } from "@/app/utils/util-saude"
import { formatDate } from "@/services/calc/Saude/calc"
import { animaisPrenhas } from "@/app/utils/util-reproducao"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function DashboardPage() {

  const [lactantes, setLactantes] = useState(0);
  const [totalAnimais, setTotalAnimais] = useState(0);
  const [production, setProduction] = useState("0");
  const [upcomingVacinations, setUpcomingVacinations] = useState<UpcomingVaccinations[]>([]);
  const [pregnantCows, setPengrantCows] = useState<PengrantCows[]>([]);
  const [healthStatsItem, setHealthStatsItem] = useState<HealthStatItem[]>([]);
  const [productionTrendData, setProductionTrendData] = useState<any[]>([]);
  const [recentAnimalsData, setRecentAnimalsData] = useState<any[]>([]);

  useEffect(() => {
    async function loadAll() {
      const animais = await getAnimalInfo();
      const converted = Object.values(animais);

      setTotalAnimais(converted.length);
      setLactantes(
        converted.filter(a => a.lactante === "lactante").length
      );

      const producaoDiaria = (await calculeProduction())[1].value;
      setProduction(producaoDiaria.toString());

      const vacinations: UpcomingVaccinations[] = await getUpcomingVaccinations();
      setUpcomingVacinations(vacinations);

      const prenhas = await animaisPrenhas();
      setPengrantCows(prenhas);

      const trendData = await getLastWeekProduction();
      setProductionTrendData(trendData);

      setRecentAnimalsData(converted.reverse());
    }

    loadAll();
  }, []);

  useEffect(() => {

    async function loadHealthStats() {
      const animais = await getAnimalInfo();
      const converted = Object.values(animais);

      if (!animais.length) return;

      const stats = animais.reduce(
        (acc, animal) => {
          if (animal.statusSaude === "Saudavel" || animal.statusSaude === "saudavel") acc.saudaveis++;
          if (animal.statusSaude === "Em Observação" || animal.statusSaude === "observação") acc.observacao++;
          if (animal.statusSaude === "Em Tratamento" || animal.statusSaude === "tratamento") acc.tratamento++;
          return acc;
        },
        { saudaveis: 0, observacao: 0, tratamento: 0 }
      );

      setHealthStatsItem([
        { status: "Saudáveis", count: stats.saudaveis, color: "green" },
        { status: "Em Observação", count: stats.observacao, color: "yellow" },
        { status: "Em Tratamento", count: stats.tratamento, color: "red" },
      ]);
    }
    loadHealthStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DataCard
          title="Total de Animais"
          value={totalAnimais.toString()}
          description="+12 desde o mês passado"
          icon={<Cow className="h-6 w-6 text-green-600" />}
          iconClassName="bg-green-100"
        />

        <DataCard
          title="Produção Diária"
          value={production + "L"}
          description="+5.2% em relação à semana passada"
          icon={<Droplets className="h-6 w-6 text-blue-600" />}
          iconClassName="bg-blue-100"
        />

        <DataCard
          title="Animais Lactantes"
          value={lactantes.toString()}
          description={`${Math.round((lactantes / totalAnimais * 100))}% do rebanho total`}
          icon={<Heart className="h-6 w-6 text-red-600" />}
          iconClassName="bg-red-100"
        />

        <DataCard
          title="Receita Mensal"
          value="R$ 45.230"
          description="+8.1% em relação ao mês anterior"
          icon={<DollarSign className="h-6 w-6 text-yellow-600" />}
          iconClassName="bg-yellow-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Production Chart */}
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
                  <YAxis dataKey="producao" />
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

        {/* Health Status */}
        <Card className="overflow-hidden border-t-4 border-t-red-500">
          <CardHeader className="bg-gradient-to-r from-red-50 to-transparent">
            <CardTitle>Distribuição de Saúde</CardTitle>
            <CardDescription>Status geral do rebanho</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={healthStatsItem}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="status" />
                  <YAxis allowDecimals={false} />

                  <Tooltip
                    formatter={(value: number) => [
                      `${value} animais`,
                      "Quantidade",
                    ]}
                  />

                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#dc2626"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-green-800">Próximas Vacinações</CardTitle>
              <Calendar className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-50 overflow-y-auto pr-2">
              {upcomingVacinations.map((vaccination, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-white rounded-lg"
                >
                  <div>
                    <p className="font-medium">
                      {vaccination.quantidadeAnimais}
                    </p>
                    <p className="text-sm text-gray-600">
                      {vaccination.vacina}
                    </p>
                    <p className="text-xs text-gray-500">
                      {vaccination.veterinario}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {formatDate(vaccination.data)}
                    </p>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800"
                    >
                      Agendado
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-blue-800">Próximos Partos</CardTitle>
              <Heart className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-50 overflow-y-auto pr-2">
              {pregnantCows.map((birth, index) => (
                <div key={index} className="p-3 bg-white rounded-lg">
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
        {/*
          <Card className="md:col-span-1 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-yellow-800">Escala Funcionarios</CardTitle>
                <Wheat className="h-5 w-5 text-yellow-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-50 overflow-y-auto pr-2">

              </div>
            </CardContent>
          </Card>
        */}
      </div>

      {/* Recent Animals Table */}
      <Card className="overflow-hidden border-t-4 border-t-green-500">
        <CardHeader className="bg-gradient-to-r from-green-50 to-transparent">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Animais Recentes</CardTitle>
              <CardDescription>Últimos animais adicionados ao sistema</CardDescription>
            </div>
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <Cow className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-y-auto max-h-60">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Raça</TableHead>
                <TableHead>Idade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Produção</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentAnimalsData.map((animal) => (
                <TableRow key={animal.id}>
                  <TableCell className="font-medium">{animal.id}</TableCell>
                  <TableCell>{animal.nome}</TableCell>
                  <TableCell>{animal.raca}</TableCell>
                  <TableCell>{animal.idade}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        animal.lactante === "lactante" ? "default" : animal.lactante === "seca" ? "secondary" : "outline"
                      }
                      className={
                        animal.lactante === "lactante"
                          ? "bg-green-100 text-green-800"
                          : animal.lactante === "seca"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }
                    >
                      {animal.lactante === "lactante" ? "Lactante" : animal.lactante === "seca" ? "Seca" : "Desconhecido"}
                    </Badge>
                  </TableCell>
                  <TableCell>{animal.producao || "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
