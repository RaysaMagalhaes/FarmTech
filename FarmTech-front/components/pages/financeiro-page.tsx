"use client"

import { useState } from "react"
import { TrendingUp, Calculator, DollarSign, CreditCard, Wallet } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DataCard } from "@/components/ui/data-card"
import { Progress } from "@/components/ui/progress"
import { SimpleChart } from "@/components/charts/simple-chart"

export default function FinanceiroPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("mes")

  const revenueBreakdown = [
    { fonte: "Venda de Leite", valor: "R$ 38.450", percentual: 85 },
    { fonte: "Venda de Animais", valor: "R$ 4.200", percentual: 9 },
    { fonte: "Subprodutos", valor: "R$ 2.580", percentual: 6 },
  ]

  const expenseCategories = [
    { categoria: "Alimentação", valor: "R$ 12.340", percentual: 43, budget: "R$ 13.000" },
    { categoria: "Veterinário", valor: "R$ 3.450", percentual: 12, budget: "R$ 3.500" },
    { categoria: "Mão de Obra", valor: "R$ 8.200", percentual: 29, budget: "R$ 8.000" },
    { categoria: "Manutenção", valor: "R$ 2.180", percentual: 8, budget: "R$ 2.500" },
    { categoria: "Outros", valor: "R$ 2.280", percentual: 8, budget: "R$ 2.000" },
  ]

  const transactions = [
    { data: "2024-01-15", descricao: "Venda de Leite - Laticínio ABC", tipo: "Receita", valor: "R$ 8.450,00" },
    { data: "2024-01-14", descricao: "Compra de Ração Concentrada", tipo: "Despesa", valor: "R$ 2.340,00" },
    { data: "2024-01-13", descricao: "Consulta Veterinária", tipo: "Despesa", valor: "R$ 480,00" },
    { data: "2024-01-12", descricao: "Venda de Novilha", tipo: "Receita", valor: "R$ 3.200,00" },
    { data: "2024-01-11", descricao: "Pagamento Funcionários", tipo: "Despesa", valor: "R$ 4.100,00" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão Financeira</h1>
          <p className="text-gray-600">Controle de receitas, despesas e lucratividade</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semana">Semana</SelectItem>
              <SelectItem value="mes">Mês</SelectItem>
              <SelectItem value="trimestre">Trimestre</SelectItem>
              <SelectItem value="ano">Ano</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-green-600 hover:bg-green-700">
            <Calculator className="mr-2 h-4 w-4" />
            Relatório Financeiro
          </Button>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DataCard
          title="Receita Total"
          value="R$ 45.230"
          description="+8.1% vs mês anterior"
          icon={<DollarSign className="h-6 w-6 text-green-600" />}
          iconClassName="bg-green-100"
          trend={{ value: "+8.1%", positive: true }}
        />

        <DataCard
          title="Custos Operacionais"
          value="R$ 28.450"
          description="+3.2% vs mês anterior"
          icon={<CreditCard className="h-6 w-6 text-red-600" />}
          iconClassName="bg-red-100"
          trend={{ value: "+3.2%", positive: false }}
        />

        <DataCard
          title="Lucro Líquido"
          value="R$ 16.780"
          description="+15.4% vs mês anterior"
          icon={<Wallet className="h-6 w-6 text-blue-600" />}
          iconClassName="bg-blue-100"
          trend={{ value: "+15.4%", positive: true }}
        />

        <DataCard
          title="Margem de Lucro"
          value="37.1%"
          description="+2.8% vs mês anterior"
          icon={<TrendingUp className="h-6 w-6 text-purple-600" />}
          iconClassName="bg-purple-100"
          trend={{ value: "+2.8%", positive: true }}
        />
      </div>

      {/* Financial Overview Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Visão Financeira</CardTitle>
          <CardDescription>Receitas, despesas e lucro dos últimos 7 meses</CardDescription>
        </CardHeader>
        <CardContent>
          <SimpleChart
            data={[
              { label: "Janeiro", value: 85, formattedValue: "R$ 45.230", color: "green" },
              { label: "Fevereiro", value: 80, formattedValue: "R$ 43.500", color: "green" },
              { label: "Março", value: 78, formattedValue: "R$ 41.800", color: "green" },
              { label: "Abril", value: 79, formattedValue: "R$ 42.500", color: "green" },
              { label: "Maio", value: 81, formattedValue: "R$ 43.200", color: "green" },
              { label: "Junho", value: 83, formattedValue: "R$ 44.100", color: "green" },
              { label: "Julho", value: 85, formattedValue: "R$ 45.230", color: "green" },
            ]}
            maxValue={100}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Composição da Receita</CardTitle>
            <CardDescription>Distribuição das fontes de receita</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueBreakdown.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{item.fonte}</span>
                    <span className="text-sm font-bold">{item.valor}</span>
                  </div>
                  <Progress value={item.percentual} className="h-2" />
                  <div className="text-right text-sm text-gray-600">{item.percentual}% do total</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Expense Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Categorias de Despesas</CardTitle>
            <CardDescription>Distribuição dos custos operacionais</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expenseCategories.map((expense, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{expense.categoria}</span>
                    <div className="text-right">
                      <span className="text-sm font-bold">{expense.valor}</span>
                      <span className="text-xs text-gray-500 block">Orçado: {expense.budget}</span>
                    </div>
                  </div>
                  <Progress value={expense.percentual} className="h-2" />
                  <div className="text-right text-sm text-gray-600">{expense.percentual}% dos custos</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Transações Recentes</CardTitle>
          <CardDescription>Últimas movimentações financeiras</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>{new Date(transaction.data).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell>{transaction.descricao}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        transaction.tipo === "Receita" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.tipo}
                    </span>
                  </TableCell>
                  <TableCell
                    className={`text-right font-medium ${
                      transaction.tipo === "Receita" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {transaction.tipo === "Receita" ? "+" : "-"}
                    {transaction.valor}
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
