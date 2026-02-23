"use client"

import { use, useEffect, useState } from "react"
import { Plus, Search, Filter, Edit, Trash2, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DataCard } from "@/components/ui/data-card"
import { toast } from "sonner"
import { AddAnimalModal } from "@/components/modais/add-animal-modal"
import { getAnimalInfo } from "@/app/utils/util-animals"


export default function RebanhoPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("todos")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [animals, setAnimals] = useState<any[]>([])

  async function loadAll() {
    async function fetchAnimals() {
      const animalsData = await getAnimals()
      // console.log("Animais encontrados:", animalsData)
      setAnimals(Object.values(animalsData))
    }
    fetchAnimals()
  }

  useEffect(() => {
    loadAll();
  }, [])

  async function getAnimals() {
    const animalInfo: AnimalData[] = await getAnimalInfo();

    return animalInfo;
  }


  const filteredAnimals = Object.values(animals).filter((animal) => {
    console.log("Animal:", typeof (animal.nome))
    const matchesSearch = animal.nome.toLowerCase().includes(searchTerm.toLowerCase()) || animal.id.includes(searchTerm)
    const matchesFilter = filterStatus === "todos" || animal.status.toLowerCase() === filterStatus.toLowerCase()
    return matchesSearch && matchesFilter
  })

  const handleAddAnimal = () => {
    setIsAddModalOpen(true)
  }

  const handleViewAnimal = (id: string) => {
    toast.info(`Visualizando animal ID: ${id}`)
  }

  const handleEditAnimal = (id: string) => {
    toast.info(`Editando animal ID: ${id}`)
  }

  const handleDeleteAnimal = (id: string) => {
    toast.info(`Excluindo animal ID: ${id}`)
  }

  const handleAnimalAdded = async (animalData: any) => {

    console.log("Animal adicionado:", animalData)

    await fetch("/api/rebanho", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(animalData),
    });

    toast.success("Animal adicionado com sucesso!")
    setIsAddModalOpen(false)
    // Aqui você pode atualizar a lista de animais
    console.log("Dados do animal:", animalData)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão do Rebanho</h1>
          <p className="text-gray-600">Controle completo dos animais da fazenda</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700" onClick={handleAddAnimal}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Animal
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DataCard
          title="Total de Animais"
          value={String(animals.length)}
          className="bg-gradient-to-br from-green-50 to-green-100 border-green-200"
        />
        <DataCard
          title="Lactantes"
          value={String(animals.filter((animal) => animal.lactante === "lactante").length)}
          className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
        />
        <DataCard
          title="Prenhas"
          value={String(animals.filter((animal) => animal.prenha === "prenha" || animal.prenha === "prenatal").length)}
          className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200"
        />
        <DataCard
          title="Secas"
          value={String(animals.filter((animal) => animal.lactante === "seca").length)}
          className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200"
        />
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros e Busca</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome ou ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="lactante">Lactante</SelectItem>
                <SelectItem value="prenha">Prenha</SelectItem>
                <SelectItem value="seca">Seca</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Mais Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Animals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Animais</CardTitle>
          <CardDescription>
            Mostrando {filteredAnimals.length} de {animals.length} animais
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Raça</TableHead>
                <TableHead>Idade</TableHead>
                <TableHead>Peso</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Produção</TableHead>
                <TableHead>Prenhez</TableHead>
                {/* <TableHead>Última Ordenha</TableHead> */}
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAnimals.map((animal) => (
                <TableRow key={animal.id}>
                  <TableCell className="font-medium">{animal.id}</TableCell>
                  <TableCell>{animal.nome}</TableCell>
                  <TableCell>{animal.raca}</TableCell>
                  <TableCell>{animal.idade}</TableCell>
                  <TableCell>{animal.peso}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        animal.lactante === "lactante" ? "default" : "outline"
                      }
                      className={
                        animal.lactante === "lactante"
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {animal.lactante === "lactante" ? "Lactante" : "Seca"}
                    </Badge>
                  </TableCell>
                  <TableCell>{animal.producao ? animal.producao : "N/A"}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        animal.prenha === "prenha" ? "default" : "outline"
                      }
                      className={
                        animal.prenha === "prenha"
                          ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                          : animal.prenha === "prenatal" ? "bg-purple-100 text-purple-800"
                            : animal.prenha === "agendada" ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                      }
                    >
                      {animal.prenha === "prenha" ? "Prenha"
                        : animal.prenha === "vazia" ? "Vazia"
                          : animal.prenha === "agendada" ? "Inseminação Agendada"
                            : animal.prenha === "prenatal" ? "Pré-Natal"
                              : "N/A"}
                    </Badge>
                  </TableCell>
                  {/* <TableCell>{animal.ultimaOrdenha ? animal.ultimaOrdenha : "N/A"}</TableCell> */}
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewAnimal(animal.id)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEditAnimal(animal.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600"
                        onClick={() => handleDeleteAnimal(animal.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal de Adicionar Animal */}
      <AddAnimalModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAnimalAdded={handleAnimalAdded}
        onSave={() => { loadAll() }}
      />
    </div>
  )
}
