interface BasicAnimal {
  id: string;
  nome: string;
  status: string;
  firebaseKey?: string
}

interface AnimalData {
  firebaseKey?: string
  id: string;
  nome: string;
  raca: string;
  idade: string;
  peso: string;
  lactante: string;
  prenha: string;
  tempoPrenhez: string;
  producao: string;
  statusSaude: string;
  ultimoCio: string;
}

interface Animal {
  firebaseKey?: string
  altura: string;
  celeiro: string;
  cor: string;
  dataAquisicao: string;
  estadoLactacao: string;
  estadoReprodutivo: string;
  estadoSaude: string;
  id: string;
  idade: string;
  lactante: string;
  nome: string;
  observacoes: string;
  origem: string;
  pasto: string;
  pasture: string;
  peso: string;
  precoAquisicao: string;
  prenha: string;
  producao: string;
  proximaVacina: string;
  raca: string;
  sexo: string;
  statusSaude: string;
  ultimaVacina: string;
  ultimoParto: string;
  veterinario: string;
}

interface FeedStock {
  firebaseKey?: string
  item: string;
  peso: string;
  capacidade: string;
  percentual?: number;
  validade: string;
}

interface FoodPlan {
  firebaseKey?: string
  categoria: string;
  qtdAnimais: string;
  qtdRacao: string;
  qtdVolumoso: string;
  custos: string;
}

interface FoodSchedule {
  firebaseKey?: string
  alimento: string;
  peso: string;
  responsavel: string;
  horario: string;
  status: string;
}

interface HealthStats {
  firebaseKey?: string
  saudaveis: string;
  emObservacao: string;
  emTratamento: string;
  recuperando: string;
}

interface HealthStatItem {
  firebaseKey?: string
  status: string;
  count: number;
  color: string;
}

interface HealthRecord {
  firebaseKey?: string
  animal: string;
  id: string;
  problema: string;
  tratamento: string;
  inicio: string;
  observacoes: string;
  status: "Em Observação" | "Em Tratamento" | "Saudavel";
}
interface UpcomingVaccinations {
  firebaseKey?: string
  quantidadeAnimais: string,
  vacina: string,
  data: string,
  veterinario: string
}

interface VeterinaryVisit {
  firebaseKey?: string
  data: string,
  veterinario: string,
  motivo: string,
  animais: string,
  custo: string
}

interface PengrantCows {
  id: string;
  nome: string;
  dataInseminacao: string;
  previsaoParto: string;
  diasGestacao: number;
  status: string;
  preparacao: string;
}

interface InseminationSchedule {
  nome: string;
  id: string;
  ultimoCio: string;
  proximoCio: string;
  statusPrenhez: string;
  status: string;
}

interface DailyProduction {
  data: string;
  manha: string;
  tarde: string;
  total: string;
  animais: number;
}

interface TopProducer {
  id: string;
  nome: string;
  producao: string;
  meta: string;
  percentual: number;
}

interface MetaProducao {
  metaDiaria?: Number;
  metaSemanal?: Number;
  metaMensal?: Number;
}

interface ProdDiaria {
  data: string;
  turno: string;
  total: string;
  diaSemana: string;
}
interface ProdSemanal {
  data: string;
  prodSegunda: string;
  prodTerca: string;
  prodQuarta: string;
  prodQuinta: string;
  prodSexta: string;
  prodSabado: string;
  prodDomingo: string;
  media: string;
}
interface ProdMensal {
  data: string;
  prodJaneiro: string;
  prodFevereiro: string;
  prodMarco: string;
  prodAbril: string;
  prodMaio: string;
  prodJunho: string;
  prodJulho: string;
  prodAgosto: string;
  prodSetembro: string;
  prodOutubro: string;
  prodNovembro: string;
  prodDezembro: string;
  media: string;
}

interface HistoricoProducao {
  data: string;
  periodo: string;
  producao: string;
  animais: string;
  mediaPorAnimal: string;
}

