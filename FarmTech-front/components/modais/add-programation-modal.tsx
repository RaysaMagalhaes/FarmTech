"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Save, Package, Clock, Users, Plus, Minus } from "lucide-react"

interface AddFeedModalProps {
  isOpen: boolean
  onClose: () => void
  onFeedAdded: (feedData: any) => void
}

export function AddFeedModal({ isOpen, onClose, onFeedAdded }: AddFeedModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("alimento")
  const [selectedAnimals, setSelectedAnimals] = useState<string[]>([])
  const [feedingSchedule, setFeedingSchedule] = useState([
    { time: "06:00", quantity: "" },
    { time: "12:00", quantity: "" },
    { time: "18:00", quantity: "" },
  ])

  const [formData, setFormData] = useState({
    // Alimento
    feedName: "",
    feedType: "",
    brand: "",
    supplier: "",
    nutritionalValue: "",
    protein: "",
    energy: "",
    fiber: "",
    moisture: "",

    // Estoque
    currentStock: "",
    minimumStock: "",
    unitCost: "",
    purchaseDate: "",
    expirationDate: "",
    storageLocation: "",

    // Programação de Alimentação
    feedingName: "",
    startDate: "",
    endDate: "",
    frequency: "daily",
    totalDailyAmount: "",
    feedingMethod: "",
    observations: "",

    // Configurações
    autoReorder: false,
    sendAlerts: true,
    trackConsumption: true,
  })

  // Lista de animais mockada
  const availableAnimals = [
    { id: "001", name: "Mimosa", category: "Lactante" },
    { id: "002", name: "Estrela", category: "Prenha" },
    { id: "003", name: "Flor", category: "Seca" },
    { id: "004", name: "Luna", category: "Lactante" },
    { id: "005", name: "Bela", category: "Lactante" },
    { id: "006", name: "Rosa", category: "Prenha" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const submitData = {
      ...formData,
      selectedAnimals,
      feedingSchedule: feedingSchedule.filter((schedule) => schedule.quantity),
      submittedAt: new Date().toISOString(),
    }

    // Simular salvamento
    setTimeout(() => {
      setIsLoading(false)
      onFeedAdded(submitData)
      resetForm()
    }, 2000)
  }

  const resetForm = () => {
    setFormData({
      feedName: "",
      feedType: "",
      brand: "",
      supplier: "",
      nutritionalValue: "",
      protein: "",
      energy: "",
      fiber: "",
      moisture: "",
      currentStock: "",
      minimumStock: "",
      unitCost: "",
      purchaseDate: "",
      expirationDate: "",
      storageLocation: "",
      feedingName: "",
      startDate: "",
      endDate: "",
      frequency: "daily",
      totalDailyAmount: "",
      feedingMethod: "",
      observations: "",
      autoReorder: false,
      sendAlerts: true,
      trackConsumption: true,
    })
    setSelectedAnimals([])
    setFeedingSchedule([
      { time: "06:00", quantity: "" },
      { time: "12:00", quantity: "" },
      { time: "18:00", quantity: "" },
    ])
    setActiveTab("alimento")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleAnimalSelection = (animalId: string, checked: boolean) => {
    if (checked) {
      setSelectedAnimals([...selectedAnimals, animalId])
    } else {
      setSelectedAnimals(selectedAnimals.filter((id) => id !== animalId))
    }
  }

  const handleScheduleChange = (index: number, field: string, value: string) => {
    const newSchedule = [...feedingSchedule]
    newSchedule[index] = { ...newSchedule[index], [field]: value }
    setFeedingSchedule(newSchedule)
  }

  const addScheduleSlot = () => {
    setFeedingSchedule([...feedingSchedule, { time: "", quantity: "" }])
  }

  const removeScheduleSlot = (index: number) => {
    if (feedingSchedule.length > 1) {
      setFeedingSchedule(feedingSchedule.filter((_, i) => i !== index))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl">Gerenciar Alimentação</DialogTitle>
          <DialogDescription>
            Adicione novos alimentos ao estoque e programe alimentações para o rebanho
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <form onSubmit={handleSubmit} className="p-6 pt-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="alimento" className="text-xs">
                  <Package className="h-4 w-4 mr-1" />
                  Alimento
                </TabsTrigger>
                <TabsTrigger value="estoque" className="text-xs">
                  <Package className="h-4 w-4 mr-1" />
                  Estoque
                </TabsTrigger>
                <TabsTrigger value="programacao" className="text-xs">
                  <Clock className="h-4 w-4 mr-1" />
                  Programação
                </TabsTrigger>
                <TabsTrigger value="animais" className="text-xs">
                  <Users className="h-4 w-4 mr-1" />
                  Animais
                </TabsTrigger>
              </TabsList>

              {/* Aba Alimento */}
              <TabsContent value="alimento" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="feedName">Nome do Alimento *</Label>
                    <Input
                      id="feedName"
                      name="feedName"
                      placeholder="Ex: Ração Concentrada Premium"
                      value={formData.feedName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="feedType">Tipo de Alimento *</Label>
                    <Select onValueChange={(value) => handleSelectChange("feedType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="racao-concentrada">Ração Concentrada</SelectItem>
                        <SelectItem value="feno">Feno</SelectItem>
                        <SelectItem value="silagem">Silagem</SelectItem>
                        <SelectItem value="pasto">Pasto</SelectItem>
                        <SelectItem value="minerais">Minerais</SelectItem>
                        <SelectItem value="suplementos">Suplementos</SelectItem>
                        <SelectItem value="volumoso">Volumoso</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="brand">Marca/Fabricante</Label>
                    <Input
                      id="brand"
                      name="brand"
                      placeholder="Ex: Purina"
                      value={formData.brand}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supplier">Fornecedor</Label>
                    <Input
                      id="supplier"
                      name="supplier"
                      placeholder="Ex: Agropecuária Silva"
                      value={formData.supplier}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Informações Nutricionais</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="protein">Proteína (%)</Label>
                      <Input
                        id="protein"
                        name="protein"
                        type="number"
                        step="0.1"
                        placeholder="Ex: 18.5"
                        value={formData.protein}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="energy">Energia (Mcal/kg)</Label>
                      <Input
                        id="energy"
                        name="energy"
                        type="number"
                        step="0.01"
                        placeholder="Ex: 2.85"
                        value={formData.energy}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fiber">Fibra (%)</Label>
                      <Input
                        id="fiber"
                        name="fiber"
                        type="number"
                        step="0.1"
                        placeholder="Ex: 12.0"
                        value={formData.fiber}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="moisture">Umidade (%)</Label>
                      <Input
                        id="moisture"
                        name="moisture"
                        type="number"
                        step="0.1"
                        placeholder="Ex: 8.5"
                        value={formData.moisture}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Aba Estoque */}
              <TabsContent value="estoque" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentStock">Estoque Atual (kg) *</Label>
                    <Input
                      id="currentStock"
                      name="currentStock"
                      type="number"
                      placeholder="Ex: 1000"
                      value={formData.currentStock}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="minimumStock">Estoque Mínimo (kg)</Label>
                    <Input
                      id="minimumStock"
                      name="minimumStock"
                      type="number"
                      placeholder="Ex: 200"
                      value={formData.minimumStock}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unitCost">Custo por kg (R$)</Label>
                    <Input
                      id="unitCost"
                      name="unitCost"
                      type="number"
                      step="0.01"
                      placeholder="Ex: 1.50"
                      value={formData.unitCost}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="storageLocation">Local de Armazenamento</Label>
                    <Select onValueChange={(value) => handleSelectChange("storageLocation", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o local" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="silo-1">Silo 1</SelectItem>
                        <SelectItem value="silo-2">Silo 2</SelectItem>
                        <SelectItem value="galpao-a">Galpão A</SelectItem>
                        <SelectItem value="galpao-b">Galpão B</SelectItem>
                        <SelectItem value="deposito">Depósito</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="purchaseDate">Data de Compra</Label>
                    <Input
                      id="purchaseDate"
                      name="purchaseDate"
                      type="date"
                      value={formData.purchaseDate}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expirationDate">Data de Validade</Label>
                    <Input
                      id="expirationDate"
                      name="expirationDate"
                      type="date"
                      value={formData.expirationDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Configurações de Estoque</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="autoReorder"
                        checked={formData.autoReorder}
                        onCheckedChange={(checked) => setFormData({ ...formData, autoReorder: checked as boolean })}
                      />
                      <Label htmlFor="autoReorder">Reposição automática quando atingir estoque mínimo</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="sendAlerts"
                        checked={formData.sendAlerts}
                        onCheckedChange={(checked) => setFormData({ ...formData, sendAlerts: checked as boolean })}
                      />
                      <Label htmlFor="sendAlerts">Enviar alertas de estoque baixo</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="trackConsumption"
                        checked={formData.trackConsumption}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, trackConsumption: checked as boolean })
                        }
                      />
                      <Label htmlFor="trackConsumption">Rastrear consumo diário</Label>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Aba Programação */}
              <TabsContent value="programacao" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="feedingName">Nome da Programação *</Label>
                    <Input
                      id="feedingName"
                      name="feedingName"
                      placeholder="Ex: Alimentação Matinal Lactantes"
                      value={formData.feedingName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frequência</Label>
                    <Select onValueChange={(value) => handleSelectChange("frequency", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a frequência" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Diária</SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                        <SelectItem value="custom">Personalizada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="startDate">Data de Início</Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">Data de Fim</Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="totalDailyAmount">Quantidade Total Diária (kg)</Label>
                    <Input
                      id="totalDailyAmount"
                      name="totalDailyAmount"
                      type="number"
                      placeholder="Ex: 50"
                      value={formData.totalDailyAmount}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="feedingMethod">Método de Alimentação</Label>
                    <Select onValueChange={(value) => handleSelectChange("feedingMethod", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o método" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="automatico">Automático</SelectItem>
                        <SelectItem value="misto">Misto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">Horários de Alimentação</h4>
                    <Button type="button" variant="outline" size="sm" onClick={addScheduleSlot}>
                      <Plus className="h-4 w-4 mr-1" />
                      Adicionar Horário
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {feedingSchedule.map((schedule, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                        <div className="flex-1">
                          <Label htmlFor={`time-${index}`}>Horário</Label>
                          <Input
                            id={`time-${index}`}
                            type="time"
                            value={schedule.time}
                            onChange={(e) => handleScheduleChange(index, "time", e.target.value)}
                          />
                        </div>
                        <div className="flex-1">
                          <Label htmlFor={`quantity-${index}`}>Quantidade (kg)</Label>
                          <Input
                            id={`quantity-${index}`}
                            type="number"
                            placeholder="Ex: 15"
                            value={schedule.quantity}
                            onChange={(e) => handleScheduleChange(index, "quantity", e.target.value)}
                          />
                        </div>
                        {feedingSchedule.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeScheduleSlot(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="observations">Observações</Label>
                  <Textarea
                    id="observations"
                    name="observations"
                    placeholder="Instruções especiais, cuidados, etc..."
                    rows={3}
                    value={formData.observations}
                    onChange={handleInputChange}
                  />
                </div>
              </TabsContent>

              {/* Aba Animais */}
              <TabsContent value="animais" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Selecionar Animais</h4>
                    <p className="text-sm text-gray-600 mb-4">Escolha quais animais receberão esta alimentação</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {availableAnimals.map((animal) => (
                      <div key={animal.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <Checkbox
                          id={`animal-${animal.id}`}
                          checked={selectedAnimals.includes(animal.id)}
                          onCheckedChange={(checked) => handleAnimalSelection(animal.id, checked as boolean)}
                        />
                        <div className="flex-1">
                          <Label htmlFor={`animal-${animal.id}`} className="font-medium">
                            {animal.name} (#{animal.id})
                          </Label>
                          <Badge variant="outline" className="ml-2 text-xs">
                            {animal.category}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedAnimals.length > 0 && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">
                        <strong>{selectedAnimals.length}</strong> animais selecionados para esta alimentação
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            {/* Botões de Ação */}
            <div className="flex justify-end gap-4 mt-6 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isLoading}>
                {isLoading ? (
                  "Salvando..."
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Alimentação
                  </>
                )}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
