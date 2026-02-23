import {
  Heart,
  Plus,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Pencil,
  Trash,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { DataCard } from "@/components/ui/data-card";
import { useState, useEffect } from "react";
import { getBasicAnimalInfo, updateAnimal } from "@/app/utils/util-animals";
import { AgendarConsultaModal } from "../modais/add-agenda-modal";
import { RegistrarOcorrenciaModal } from "../modais/add-ocorrencia-modal";
import { deleteRecord, getHealthRecords, getUpcomingVaccinations, getVeterinaryVisits } from "@/app/utils/util-saude";
import { AgendarVacinacaoModal } from "../modais/add-new-vacinacao";
import { formatDate } from "@/services/calc/Saude/calc";

export default function SaudePage() {

  const [healthStatsItem, setHealthStatsItem] = useState<HealthStatItem[]>([]);
  const [animais, setAnimais] = useState<BasicAnimal[]>([]);
  const [openConsulta, setOpenConsulta] = useState(false);
  const [openOcorrencia, setOpenOcorrencia] = useState(false);
  const [openVacinacao, setOpenVacinacao] = useState(false);
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);
  const [upcomingVaccinations, setUpcomingVaccinations] = useState<UpcomingVaccinations[]>([]);
  const [saudaveis, setSaudaveis] = useState(0);
  const [emTratamento, setEmTratamento] = useState(0);
  const [emObservacao, setEmObservacao] = useState(0);
  const [veterinaryVisits, setVeterinaryVisits] = useState<(VeterinaryVisit & { firebaseKey: string })[]>([]);
  const [record, setRecord] = useState<HealthRecord | undefined>();
  const [visit, setVisit] = useState<VeterinaryVisit | undefined>();
  const [createRecord, setCreateRecord] = useState(true)



  async function loadAllData() {
    try {
      const [animalsData, vacinations, healthData, visitsData] =
        await Promise.all([
          getBasicAnimalInfo(),
          getUpcomingVaccinations(),
          getHealthRecords(),
          getVeterinaryVisits(),
        ]);

      setAnimais(animalsData);
      setUpcomingVaccinations(vacinations);
      setHealthRecords(healthData);
      setVeterinaryVisits(visitsData);

    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  }


  useEffect(() => {
    loadAllData();
  }, []);


  useEffect(() => {
    if (!animais.length) return;

    const stats = animais.reduce(
      (acc, animal) => {
        if (animal.status === "Saudavel" || animal.status === "saudavel") acc.saudaveis++;
        if (animal.status === "Em Observação" || animal.status === "observação") acc.observacao++;
        if (animal.status === "Em Tratamento" || animal.status === "tratamento") acc.tratamento++;
        return acc;
      },
      { saudaveis: 0, observacao: 0, tratamento: 0 }
    );

    setSaudaveis(stats.saudaveis);
    setEmObservacao(stats.observacao);
    setEmTratamento(stats.tratamento);

    setHealthStatsItem([
      { status: "Saudáveis", count: stats.saudaveis, color: "green" },
      { status: "Em Observação", count: stats.observacao, color: "yellow" },
      { status: "Em Tratamento", count: stats.tratamento, color: "red" },
    ]);

  }, [animais]);



  const onEditRecord = (record: HealthRecord) => {
    setRecord(record);
    loadAllData();
    setOpenOcorrencia(true);
  };

  const onDeleteRecord = async (record: HealthRecord) => {
    await deleteRecord("HealthRecords", record.firebaseKey || "")
    const animal = animais.find(
      (a) => a.id === record.id
    );

    if (!animal) return;

    await updateAnimal(animal.firebaseKey || "", {
      statusSaude: "Saudavel",
    });
    loadAllData();
  };

  const onEditVisit = (record: VeterinaryVisit) => {
    setVisit(record);
    loadAllData();
    setOpenConsulta(true);
  };

  const onDeleteVisit = async (record: VeterinaryVisit) => {
    await deleteRecord("VisitasVeterinarias", record.firebaseKey || "")
    loadAllData();
  };


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Saúde</h1>
          <p className="text-gray-600">
            Controle sanitário e veterinário do rebanho
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => {
            setCreateRecord(true)
            setOpenConsulta(true)
          }}>
            <Calendar className="mr-2 h-4 w-4" />
            Agendar Consulta
          </Button>

          <Button
            variant="outline"
            className="border-red-600 text-red-600 hover:bg-red-100"
            onClick={() => {
              setCreateRecord(true)
              setOpenOcorrencia(true)
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Registrar Ocorrência
          </Button>

          <Button
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-100"
            onClick={() => {
              setOpenVacinacao(true)
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Vacinação
          </Button>

          <AgendarConsultaModal
            open={openConsulta}
            onOpenChange={setOpenConsulta}
            record={visit}
            create={createRecord}
            onSaved={loadAllData}
          />

          <RegistrarOcorrenciaModal
            open={openOcorrencia}
            animals={animais}
            onOpenChange={setOpenOcorrencia}
            record={record}
            create={createRecord}
            onSaved={loadAllData}
          />

          <AgendarVacinacaoModal
            open={openVacinacao}
            onOpenChange={setOpenVacinacao}
            onSaved={loadAllData}
          />
        </div>
      </div>

      {/* Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DataCard
          title="Animais Saudáveis"
          value={saudaveis.toString()}
          icon={<CheckCircle className="h-6 w-6 text-green-600" />}
          iconClassName="bg-green-100"
        />
        <DataCard
          title="Em Observação"
          value={emObservacao.toString()}
          icon={<AlertTriangle className="h-6 w-6 text-yellow-600" />}
          iconClassName="bg-yellow-100"
        />
        <DataCard
          title="Em Tratamento"
          value={emTratamento.toString()}
          icon={<Heart className="h-6 w-6 text-red-600" />}
          iconClassName="bg-red-100"
        />
        <DataCard
          title="Vacinações Pendentes"
          value={upcomingVaccinations.length.toString()}
          icon={<Calendar className="h-6 w-6 text-blue-600" />}
          iconClassName="bg-blue-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Health Status Distribution */}
        <Card>
          <CardHeader>
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

        {/* Upcoming Vaccinations */}
        <Card>
          <CardHeader>
            <CardTitle>Próximas Vacinações</CardTitle>
            <CardDescription>Cronograma de imunização</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingVaccinations.map((vaccination, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-blue-50 rounded-lg"
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
                      className="bg-blue-100 text-blue-800"
                    >
                      Agendado
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          
        </Card>
      </div>

      {/* Health Records */}
      <Card>
        <CardHeader>
          <CardTitle>Registros de Saúde</CardTitle>
          <CardDescription>
            Histórico de tratamentos e ocorrências
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Animal</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Problema</TableHead>
                <TableHead>Tratamento</TableHead>
                <TableHead>Início</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Observações</TableHead>
                <TableHead>Opções</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {healthRecords.map((record: HealthRecord, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{record.animal}</TableCell>
                  <TableCell>{record.id}</TableCell>
                  <TableCell>{record.problema}</TableCell>
                  <TableCell>{record.tratamento}</TableCell>
                  <TableCell>
                    {formatDate(record.inicio)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        record.status === "Em Tratamento"
                          ? "bg-red-100 text-red-800"
                          : record.status === "Em Observação"
                            ? "bg-yellow-100 text-yellow-800"
                            : record.status === "Saudavel"
                              ? "bg-green-100 text-green-800"
                              : undefined
                      }
                    >
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{record.observacoes}</TableCell>
                  <TableCell>
                    <Button variant="outline"
                      className="ml-3 border-blue-200 text-blue-800 hover:bg-blue-100"
                      onClick={() => {
                        setCreateRecord(false)
                        onEditRecord(record)
                      }}>
                      <Pencil className="text-blue-800" />
                    </Button>
                    <Button variant="outline"
                      className="ml-3 border-red-200 text-red-800 hover:bg-red-200"
                      onClick={() => { onDeleteRecord(record) }}>
                      <Trash className="text-red-800" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Veterinary Visits */}
      <Card>
        <CardHeader>
          <CardTitle>Visitas Veterinárias</CardTitle>
          <CardDescription>
            Histórico de consultas e procedimentos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Veterinário</TableHead>
                <TableHead>Motivo</TableHead>
                <TableHead>Animais Atendidos</TableHead>
                <TableHead>Custo</TableHead>
                <TableHead>Opções</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {veterinaryVisits.map((visit: VeterinaryVisit, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {formatDate(visit.data)}
                  </TableCell>
                  <TableCell>{visit.veterinario}</TableCell>
                  <TableCell>{visit.motivo}</TableCell>
                  <TableCell>{visit.animais}</TableCell>
                  <TableCell>{visit.custo}</TableCell>
                  <TableCell>
                    <Button variant="outline"
                      className="ml-3 border-blue-200 text-blue-800 hover:bg-blue-100"
                      onClick={() => {
                        setCreateRecord(false)
                        onEditVisit(visit)
                      }}>
                      <Pencil className="text-blue-800" />
                    </Button>
                    <Button variant="outline"
                      className="ml-3 border-red-200 text-red-800 hover:bg-red-200"
                      onClick={() => { onDeleteVisit(visit) }}>
                      <Trash className="text-red-800" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
