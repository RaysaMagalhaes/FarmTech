import { Users, Plus, Clock, Award } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DataCard } from "@/components/ui/data-card"
import { Progress } from "@/components/ui/progress"

export default function FuncionariosPage() {
  const employees = [
    {
      nome: "João Silva",
      cargo: "Ordenhador",
      turno: "Manhã",
      salario: "R$ 2.800",
      admissao: "2022-03-15",
      status: "Ativo",
      telefone: "(11) 99999-1234",
    },
    {
      nome: "Maria Santos",
      cargo: "Tratadora",
      turno: "Integral",
      salario: "R$ 3.200",
      admissao: "2021-08-20",
      status: "Ativo",
      telefone: "(11) 99999-5678",
    },
    {
      nome: "Pedro Oliveira",
      cargo: "Ordenhador",
      turno: "Tarde",
      salario: "R$ 2.800",
      admissao: "2023-01-10",
      status: "Ativo",
      telefone: "(11) 99999-9012",
    },
    {
      nome: "Ana Costa",
      cargo: "Veterinária",
      turno: "Consultor",
      salario: "R$ 5.500",
      admissao: "2020-05-12",
      status: "Ativo",
      telefone: "(11) 99999-3456",
    },
  ]

  const workSchedule = [
    {
      funcionario: "João Silva",
      segunda: "06:00-14:00",
      terca: "06:00-14:00",
      quarta: "06:00-14:00",
      quinta: "06:00-14:00",
      sexta: "06:00-14:00",
    },
    {
      funcionario: "Maria Santos",
      segunda: "08:00-17:00",
      terca: "08:00-17:00",
      quarta: "08:00-17:00",
      quinta: "08:00-17:00",
      sexta: "08:00-17:00",
    },
    {
      funcionario: "Pedro Oliveira",
      segunda: "14:00-22:00",
      terca: "14:00-22:00",
      quarta: "14:00-22:00",
      quinta: "14:00-22:00",
      sexta: "14:00-22:00",
    },
  ]

  const performance = [
    { funcionario: "João Silva", pontualidade: 98, qualidade: 95, produtividade: 92 },
    { funcionario: "Maria Santos", pontualidade: 100, qualidade: 98, produtividade: 96 },
    { funcionario: "Pedro Oliveira", pontualidade: 95, qualidade: 90, produtividade: 88 },
    { funcionario: "Ana Costa", pontualidade: 100, qualidade: 100, produtividade: 98 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Funcionários</h1>
          <p className="text-gray-600">Controle de equipe e recursos humanos</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Clock className="mr-2 h-4 w-4" />
            Ponto Eletrônico
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Funcionário
          </Button>
        </div>
      </div>

      {/* Employee Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DataCard
          title="Total Funcionários"
          value="12"
          icon={<Users className="h-6 w-6 text-blue-600" />}
          iconClassName="bg-blue-100"
        />
        <DataCard
          title="Funcionários Ativos"
          value="11"
          icon={<Users className="h-6 w-6 text-green-600" />}
          iconClassName="bg-green-100"
        />
        <DataCard
          title="Folha de Pagamento"
          value="R$ 38.400"
          icon={<Award className="h-6 w-6 text-purple-600" />}
          iconClassName="bg-purple-100"
        />
        <DataCard
          title="Taxa de Presença"
          value="96%"
          icon={<Clock className="h-6 w-6 text-orange-600" />}
          iconClassName="bg-orange-100"
        />
      </div>

      {/* Employee List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Funcionários</CardTitle>
          <CardDescription>Informações da equipe</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Funcionário</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Turno</TableHead>
                <TableHead>Salário</TableHead>
                <TableHead>Admissão</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>
                          {employee.nome
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{employee.nome}</span>
                    </div>
                  </TableCell>
                  <TableCell>{employee.cargo}</TableCell>
                  <TableCell>{employee.turno}</TableCell>
                  <TableCell>{employee.salario}</TableCell>
                  <TableCell>{new Date(employee.admissao).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell>{employee.telefone}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800">{employee.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Work Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Escala de Trabalho</CardTitle>
            <CardDescription>Horários da semana atual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workSchedule.map((schedule, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium mb-2">{schedule.funcionario}</p>
                  <div className="grid grid-cols-5 gap-2 text-sm">
                    <div>
                      <span className="font-medium">Seg:</span>
                      <br />
                      {schedule.segunda}
                    </div>
                    <div>
                      <span className="font-medium">Ter:</span>
                      <br />
                      {schedule.terca}
                    </div>
                    <div>
                      <span className="font-medium">Qua:</span>
                      <br />
                      {schedule.quarta}
                    </div>
                    <div>
                      <span className="font-medium">Qui:</span>
                      <br />
                      {schedule.quinta}
                    </div>
                    <div>
                      <span className="font-medium">Sex:</span>
                      <br />
                      {schedule.sexta}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Avaliação de Desempenho</CardTitle>
            <CardDescription>Métricas de performance da equipe</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performance.map((perf, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium mb-3">{perf.funcionario}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Pontualidade</span>
                      <span className="text-sm font-medium">{perf.pontualidade}%</span>
                    </div>
                    <Progress value={perf.pontualidade} className="h-2" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Qualidade</span>
                      <span className="text-sm font-medium">{perf.qualidade}%</span>
                    </div>
                    <Progress value={perf.qualidade} className="h-2" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Produtividade</span>
                      <span className="text-sm font-medium">{perf.produtividade}%</span>
                    </div>
                    <Progress value={perf.produtividade} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
