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
import { Save, Heart, Weight, MapPin, Baby } from "lucide-react"

interface AddAnimalModalProps {
  isOpen: boolean
  onClose: () => void
  onAnimalAdded: (animalData: any) => void
  onSave: () => void
}

export function AddAnimalModal({ isOpen, onClose, onAnimalAdded, onSave }: AddAnimalModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Informações Básicas
    nome: "",
    id: "",
    raca: "",
    sexo: "",
    idade: "",

    // Informações Físicas
    peso: "",
    altura: "",
    cor: "",

    // Informações de Saúde
    veterinario: "",

    // Informações Reprodutivas
    ultimoParto: "",
    prenha: "",
    tempoPrenhez: "",
    ultimoCio: "",

    // Informações de Produção
    producao: "",

    // Localização e Outros
    pasto: "",
    celeiro: "",
    dataAquisicao: "",
    precoAquisicao: "",
    origem: "",
    observacoes: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular salvamento
    setTimeout(() => {
      setIsLoading(false)
      onAnimalAdded(formData)
      // Reset form
      setFormData({
        nome: "",
        id: "",
        raca: "",
        sexo: "",
        idade: "",
        peso: "",
        altura: "",
        cor: "",
        veterinario: "",
        ultimoParto: "",
        prenha: "",
        tempoPrenhez: "",
        producao: "",
        pasto: "",
        celeiro: "",
        dataAquisicao: "",
        precoAquisicao: "",
        origem: "",
        observacoes: "",
        ultimoCio: "",
      })
    }, 2000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (nome: string, value: string) => {
    setFormData({
      ...formData,
      [nome]: value,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl">Adicionar Novo Animal</DialogTitle>
          <DialogDescription>Preencha as informações do animal para adicioná-lo ao rebanho</DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <form onSubmit={handleSubmit} className="p-6 pt-0">
            <Tabs defaultValue="basicas" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="basicas" className="text-xs">
                  <Heart className="h-4 w-4 mr-1" />
                  Básicas
                </TabsTrigger>
                <TabsTrigger value="fisicas" className="text-xs">
                  <Weight className="h-4 w-4 mr-1" />
                  Físicas
                </TabsTrigger>
                <TabsTrigger value="saude" className="text-xs">
                  <Heart className="h-4 w-4 mr-1" />
                  Saúde
                </TabsTrigger>
                <TabsTrigger value="reproducao" className="text-xs">
                  <Baby className="h-4 w-4 mr-1" />
                  Reprodução
                </TabsTrigger>
                <TabsTrigger value="outros" className="text-xs">
                  <MapPin className="h-4 w-4 mr-1" />
                  Outros
                </TabsTrigger>
              </TabsList>

              {/* Informações Básicas */}
              <TabsContent value="basicas" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome do Animal *</Label>
                    <Input
                      id="nome"
                      name="nome"
                      placeholder="Ex: Mimosa"
                      value={formData.nome}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="id">Número/Tag *</Label>
                    <Input
                      id="id"
                      name="id"
                      placeholder="Ex: 001"
                      value={formData.id}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="raca">Raça</Label>
                    <Input
                      id="raca"
                      name="raca"
                      placeholder="Ex: Holandesa"
                      value={formData.raca}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sexo">Sexo *</Label>
                    <Select onValueChange={(value) => handleSelectChange("sexo", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o sexo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="macho">Macho</SelectItem>
                        <SelectItem value="femea">Fêmea</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idade">Data de Nascimento</Label>
                    <Input
                      id="idade"
                      name="idade"
                      type="date"
                      value={formData.idade}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Informações Físicas */}
              <TabsContent value="fisicas" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="peso">Peso (kg)</Label>
                    <Input
                      id="peso"
                      name="peso"
                      type="number"
                      placeholder="Ex: 450"
                      value={formData.peso}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="altura">Altura (cm)</Label>
                    <Input
                      id="altura"
                      name="altura"
                      type="number"
                      placeholder="Ex: 140"
                      value={formData.altura}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="color">Cor/Pelagem</Label>
                    <Input
                      id="cor"
                      name="cor"
                      placeholder="Ex: Preta e branca"
                      value={formData.cor}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Informações de Saúde */}
              <TabsContent value="saude" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="statusSaude">Status de Saúde</Label>
                    <Select onValueChange={(value) => handleSelectChange("statusSaude", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="saudavel">Saudável</SelectItem>
                        <SelectItem value="observacao">Em Observação</SelectItem>
                        <SelectItem value="tratamento">Em Tratamento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="veterinario">Veterinário Responsável</Label>
                    <Input
                      id="veterinario"
                      name="veterinario"
                      placeholder="Nome do veterinário"
                      value={formData.veterinario}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Informações Reprodutivas */}
              <TabsContent value="reproducao" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="prenha">Status Reprodutivo</Label>
                    <Select onValueChange={(value) => handleSelectChange("prenha", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vazia">Vazia</SelectItem>
                        <SelectItem value="prenha">Prenha</SelectItem>
                        <SelectItem value="agendada">Inseminação Agendada</SelectItem>
                        <SelectItem value="prenatal">Pré-Natal</SelectItem>
                        <SelectItem value="nao-se-aplica">Não se aplica</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ultimoParto">Último Parto</Label>
                    <Input
                      id="ultimoParto"
                      name="ultimoParto"
                      type="date"
                      value={formData.ultimoParto}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tempoPrenhez">Data de Prenhez (se aplicável)</Label>
                    <Input
                      id="tempoPrenhez"
                      name="tempoPrenhez"
                      type="date"
                      placeholder="Ex: 26/04/2024"
                      value={formData.tempoPrenhez}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tempoPrenhez">Ultimo Cio (se aplicável)</Label>
                    <Input
                      id="ultimoCio"
                      name="ultimoCio"
                      type="date"
                      placeholder="Ex: 26/04/2024"
                      value={formData.ultimoCio}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="producao">Produção de Leite (L/dia)</Label>
                    <Input
                      id="producao"
                      name="producao"
                      type="number"
                      step="0.1"
                      placeholder="Ex: 25.5"
                      value={formData.producao}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lactante">Status de Lactação</Label>
                    <Select onValueChange={(value) => handleSelectChange("lactante", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lactante">Lactante</SelectItem>
                        <SelectItem value="seca">Seca</SelectItem>
                        <SelectItem value="nao-aplicavel">Não se aplica</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              {/* Outros */}
              <TabsContent value="outros" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pasture">Pasto Atual</Label>
                    <Select onValueChange={(value) => handleSelectChange("pasture", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o pasto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pasto-1">Pasto 1</SelectItem>
                        <SelectItem value="pasto-2">Pasto 2</SelectItem>
                        <SelectItem value="pasto-3">Pasto 3</SelectItem>
                        <SelectItem value="pasto-4">Pasto 4</SelectItem>
                        <SelectItem value="curral">Curral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="celeiro">Estábulo/Galpão</Label>
                    <Input
                      id="celeiro"
                      name="celeiro"
                      placeholder="Ex: Galpão A"
                      value={formData.celeiro}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dataAquisicao">Data de Aquisição</Label>
                    <Input
                      id="dataAquisicao"
                      name="dataAquisicao"
                      type="date"
                      value={formData.dataAquisicao}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="precoAquisicao">Preço de Aquisição (R$)</Label>
                    <Input
                      id="precoAquisicao"
                      name="precoAquisicao"
                      type="number"
                      step="0.01"
                      placeholder="Ex: 2500.00"
                      value={formData.precoAquisicao}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="origem">Origem/Fornecedor</Label>
                    <Input
                      id="origem"
                      name="origem"
                      placeholder="Ex: Fazenda São João"
                      value={formData.origem}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="observacoes">Observações</Label>
                    <Textarea
                      id="observacoes"
                      name="observacoes"
                      placeholder="Informações adicionais sobre o animal..."
                      rows={3}
                      value={formData.observacoes}
                      onChange={handleInputChange}
                    />
                  </div>
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
                    Salvar Animal
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
