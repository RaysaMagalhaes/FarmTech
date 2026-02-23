"use client"

import { useState } from "react"
import { Settings, Save, Bell, Shield, Database } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

export default function ConfiguracoesPage() {
  const [farmName, setFarmName] = useState("Fazenda São José")
  const [notifications, setNotifications] = useState(true)
  const [autoBackup, setAutoBackup] = useState(true)
  const [language, setLanguage] = useState("pt-br")
  const [timezone, setTimezone] = useState("america-sao_paulo")

  const handleSaveChanges = () => {
    toast.success("Configurações salvas com sucesso!")
  }

  const handleChangePassword = () => {
    toast.error("Funcionalidade de alteração de senha será implementada!")
  }

  const handleBackup = () => {
    toast.success("Backup iniciado com sucesso!")
  }

  const handleExport = () => {
    toast.info("Exportação de dados iniciada!")
  }

  const handleImport = () => {
    toast.info("Funcionalidade de importação será implementada!")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600">Personalize as configurações do sistema</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700" onClick={handleSaveChanges}>
          <Save className="mr-2 h-4 w-4" />
          Salvar Alterações
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Farm Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              Informações da Fazenda
            </CardTitle>
            <CardDescription>Dados básicos da propriedade</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="farm-name">Nome da Fazenda</Label>
              <Input id="farm-name" value={farmName} onChange={(e) => setFarmName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="owner">Proprietário</Label>
              <Input id="owner" defaultValue="José da Silva" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Localização</Label>
              <Input id="location" defaultValue="São Paulo, SP" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="area">Área Total (hectares)</Label>
              <Input id="area" type="number" defaultValue="150" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registration">Registro/CNPJ</Label>
              <Input id="registration" defaultValue="12.345.678/0001-90" />
            </div>
          </CardContent>
        </Card>

        {/* System Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Preferências do Sistema
            </CardTitle>
            <CardDescription>Configurações de funcionamento</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificações</Label>
                <p className="text-sm text-gray-500">Receber alertas e lembretes</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Backup Automático</Label>
                <p className="text-sm text-gray-500">Backup diário dos dados</p>
              </div>
              <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Idioma</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-br">Português (Brasil)</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Fuso Horário</Label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="america-sao_paulo">América/São Paulo</SelectItem>
                  <SelectItem value="america-new_york">América/Nova York</SelectItem>
                  <SelectItem value="europe-london">Europa/Londres</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Configurações de Segurança
          </CardTitle>
          <CardDescription>Controle de acesso e segurança</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Senha Atual</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Nova Senha</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button variant="outline" className="w-full" onClick={handleChangePassword}>
                Alterar Senha
              </Button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">Dicas de Segurança</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Use senhas com pelo menos 8 caracteres</li>
                  <li>• Inclua letras maiúsculas e minúsculas</li>
                  <li>• Adicione números e símbolos</li>
                  <li>• Não compartilhe suas credenciais</li>
                </ul>
              </div>

              <div className="space-y-2">
                <Label>Sessões Ativas</Label>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium">Desktop - Chrome</p>
                  <p className="text-xs text-gray-500">Último acesso: Hoje às 14:30</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="mr-2 h-5 w-5" />
            Gestão de Dados
          </CardTitle>
          <CardDescription>Backup, exportação e importação de dados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <Database className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <h4 className="font-medium mb-2">Backup Manual</h4>
              <p className="text-sm text-gray-600 mb-3">Criar backup dos dados atuais</p>
              <Button variant="outline" size="sm" onClick={handleBackup}>
                Fazer Backup
              </Button>
            </div>

            <div className="p-4 border rounded-lg text-center">
              <Database className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <h4 className="font-medium mb-2">Exportar Dados</h4>
              <p className="text-sm text-gray-600 mb-3">Exportar para Excel/CSV</p>
              <Button variant="outline" size="sm" onClick={handleExport}>
                Exportar
              </Button>
            </div>

            <div className="p-4 border rounded-lg text-center">
              <Database className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <h4 className="font-medium mb-2">Importar Dados</h4>
              <p className="text-sm text-gray-600 mb-3">Importar de arquivo externo</p>
              <Button variant="outline" size="sm" onClick={handleImport}>
                Importar
              </Button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Último Backup</h4>
            <p className="text-sm text-blue-700">Realizado em 15/01/2024 às 03:00 - Tamanho: 2.3 MB</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
