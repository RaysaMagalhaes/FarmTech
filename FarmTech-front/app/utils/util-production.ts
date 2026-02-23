
// =============================
// 🔥 TABELAS CENTRALIZADAS
// =============================

export const PRODUCTION_TABLES = {
    metas: "MetasProducao",
    daily: "ProducaoDiaria",
    weekly: "ProducaoSemanal",
    monthly: "ProducaoMensal",
    history: "HistoricoProducao",
} as const;
import { getAnimalInfo } from "./util-animals";

type producaoTable = (typeof PRODUCTION_TABLES)[keyof typeof PRODUCTION_TABLES];


// =============================
// 🔥 FETCH GENÉRICO (GET)
// =============================

async function fetchWithFirebaseKey<T>(
    table: producaoTable
): Promise<(T & { firebaseKey: string })[]> {
    const response = await fetch(`/api/producao/${table}`);

    if (!response.ok) return [];

    const json = await response.json();

    const firebaseObject = json.data ?? json;

    if (!firebaseObject) return [];

    return Object.entries(firebaseObject).map(
        ([firebaseKey, value]: [string, any]) => ({
            firebaseKey,
            ...value,
        })
    );
}


// =============================
// 🔥 MUTATE GENÉRICO (POST | PUT | DELETE)
// =============================

async function mutate<T>(
    table: producaoTable,
    method: "POST" | "PUT" | "DELETE",
    id?: string,
    data?: T
) {
    const url = id
        ? `/api/producao/${table}/${id}`
        : `/api/producao/${table}`;

    const response = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
        throw new Error(`Erro na requisição: ${method} ${url}`);
    }

    return response.json();
}


// =============================
// 🔥 GETs ESPECÍFICOS
// =============================

export const getMetasProducao = () =>
    fetchWithFirebaseKey<MetaProducao>(PRODUCTION_TABLES.metas);

export const getProducaoDiaria = () =>
    fetchWithFirebaseKey<ProdDiaria>(PRODUCTION_TABLES.daily);

export const getProducaoSemanal = () =>
    fetchWithFirebaseKey<ProdSemanal>(PRODUCTION_TABLES.weekly);

export const getProducaoMensal = () =>
    fetchWithFirebaseKey<ProdMensal>(PRODUCTION_TABLES.monthly);

export const getHistoricoProducao = () =>
    fetchWithFirebaseKey<HistoricoProducao>(PRODUCTION_TABLES.history);

// =============================
// 🔥 CREATE (POST)
// =============================

export const createMetaProducao = (data: MetaProducao) =>
    mutate(PRODUCTION_TABLES.metas, "POST", undefined, data);

export const createDailyProducao = (data: ProdDiaria) =>
    mutate(PRODUCTION_TABLES.daily, "POST", undefined, data);

export const createWeeklyProducao = (data: ProdSemanal) =>
    mutate(PRODUCTION_TABLES.weekly, "POST", undefined, data);

export const createMonthlyProducao = (data: ProdMensal) =>
    mutate(PRODUCTION_TABLES.monthly, "POST", undefined, data);

export const createHistoricoProducao = (data: HistoricoProducao) =>
    mutate(PRODUCTION_TABLES.history, "POST", undefined, data);

// =============================
// 🔥 UPDATE (PUT)
// =============================

export const updateRecord = <T>(
    table: producaoTable,
    id: string,
    data: T
) => mutate(table, "PUT", id, data);


// =============================
// 🔥 DELETE
// =============================

export const deleteRecord = (
    table: producaoTable,
    id: string
) => mutate(table, "DELETE", id);

// =============================
// 🔥 Funções extras
// =============================

export async function fetchDailyProduction() {
    // Simula uma chamada à API para obter a produção diária
    return [
        { data: "2024-01-15", manha: "162L", tarde: "152L", total: "314L", animais: 15 },
        { data: "2024-01-16", manha: "165L", tarde: "159L", total: "324L", animais: 15 },
        { data: "2024-01-17", manha: "158L", tarde: "154L", total: "312L", animais: 15 },
        { data: "2024-01-18", manha: "168L", tarde: "160L", total: "328L", animais: 15 },
        { data: "2024-01-19", manha: "162L", tarde: "158L", total: "320L", animais: 15 },
    ]

}

export async function getTopProducers() {
    // Simula uma chamada à API para obter os maiores produtores

    const animals: AnimalData[] = await getAnimalInfo()
    const converted = Object.values(animals).filter(animal => (animal.producao && animal.producao !== "0"));
    const topProducers = converted.sort((a, b) => {
        const aVal = parseFloat(a.producao);
        const bVal = parseFloat(b.producao);
        return bVal - aVal;
    }).slice(0, 4);

    const mediaProducao = await calculeProduction()

    const bestProducers: TopProducer[] = topProducers.map(animal => ({
        id: animal.id,
        nome: animal.nome,
        producao: animal.producao,
        meta: `${mediaProducao[0].value}L`,
        percentual: ((parseFloat(animal.producao) / parseFloat(mediaProducao[0].value.toString())) * 100).toFixed(2) as unknown as number
    }));

    return bestProducers;
}

export async function calculeProduction() {
    const animals: AnimalData[] = await getAnimalInfo()
    const converted = Object.values(animals).filter(animal => (animal.producao && animal.producao !== "0"));
    const totalProduction = converted.reduce((total, animal) => total + parseFloat(animal.producao), 0);
    const media = [
        { tag: "media", value: totalProduction / converted.length },
        { tag: "total", value: totalProduction }
    ];


    return media;
}

export async function getLastWeekProduction() {
    const registros = await getProducaoDiaria();

    const diasSemana = [
        { dia: "Segunda-feira", producao: 0 },
        { dia: "Terça-feira", producao: 0 },
        { dia: "Quarta-feira", producao: 0 },
        { dia: "Quinta-feira", producao: 0 },
        { dia: "Sexta-feira", producao: 0 },
        { dia: "Sábado", producao: 0 },
        { dia: "Domingo", producao: 0 },
    ];

    const hoje = new Date();
    const seteDiasAtras = new Date();
    seteDiasAtras.setDate(hoje.getDate() - 7);

    // 🔥 Corrigido: comparação usando Date
    const cortes = registros.filter((registro) => {
        const dataRegistro = new Date(registro.data);
        return dataRegistro >= seteDiasAtras && dataRegistro <= hoje;
    });

    
    cortes.forEach((corte) => {
        
        const diaIndex = diasSemana.findIndex(dia => dia.dia === corte.diaSemana);
        
        if (diaIndex !== -1) {
            diasSemana[diaIndex].producao += Number(corte.total);
        }
    });

    console.log("Produção dos últimos 7 dias:", diasSemana);

    return diasSemana;
}