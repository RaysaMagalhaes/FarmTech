// =============================
// 🔥 TABELAS CENTRALIZADAS
// =============================

export const ALIMENTACAO_TABLES = {
  plano: "Plano",
  estoque: "Estoque",
  cronograma: "Cronograma",
} as const;

type AlimentacaoTable =
  (typeof ALIMENTACAO_TABLES)[keyof typeof ALIMENTACAO_TABLES];


// =============================
// 🔥 FETCH GENÉRICO (GET)
// =============================

async function fetchWithFirebaseKey<T>(
  table: AlimentacaoTable
): Promise<(T & { firebaseKey: string })[]> {
  const response = await fetch(`/api/alimentacao/${table}`);

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
  table: AlimentacaoTable,
  method: "POST" | "PUT" | "DELETE",
  id?: string,
  data?: T
) {
  const url = id
    ? `/api/alimentacao/${table}/${id}`
    : `/api/alimentacao/${table}`;

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

export const getFoodPlan = () =>
  fetchWithFirebaseKey<FoodPlan>(ALIMENTACAO_TABLES.plano);

export const getFeedStock = () =>
  fetchWithFirebaseKey<FeedStock>(ALIMENTACAO_TABLES.estoque);

export const getFoodSchedule = () =>
  fetchWithFirebaseKey<FoodSchedule>(ALIMENTACAO_TABLES.cronograma);


// =============================
// 🔥 CREATE (POST)
// =============================

export const createFoodPlan = (data: FoodPlan) =>
  mutate(ALIMENTACAO_TABLES.plano, "POST", undefined, data);

export const createFeedStock = (data: FeedStock) =>
  mutate(ALIMENTACAO_TABLES.estoque, "POST", undefined, data);

export const createFoodSchedule = (data: FoodSchedule) =>
  mutate(ALIMENTACAO_TABLES.cronograma, "POST", undefined, data);


// =============================
// 🔥 UPDATE (PUT)
// =============================

export const updateAlimentacaoRecord = <T>(
  table: AlimentacaoTable,
  id: string,
  data: T
) => mutate(table, "PUT", id, data);


// =============================
// 🔥 DELETE
// =============================

export const deleteAlimentacaoRecord = (
  table: AlimentacaoTable,
  id: string
) => mutate(table, "DELETE", id);

// =============================
// 🔥 Funções extras
// =============================
export function calculaMediaEstoque(data: any[]) {
    data.forEach(e => {
        console.log(e);
    });

    return parseFloat("0.00");
}

export async function calculaMediaAnimal() {
    const data: any[] = await getFoodPlan();
    let soma = 0;
    let somaA = 0;
    let media = 0;

    data.forEach(e => {
        soma += parseFloat(e.qtdVolumoso) + parseFloat(e.qtdRacao);
        somaA += parseFloat(e.qtdAnimais);
    });
    if (data.length == 0) {
        return parseFloat("0.00");
    }
    media = soma / somaA
    return media;
}

export async function calculaCustoDiario() {
    const data: any[] = await getFoodPlan();
    let soma = 0;

    data.forEach(e => {
        soma += ((parseFloat(e.prcVolumoso) * parseFloat(e.qtdVolumoso)) + (parseFloat(e.prcRacao) * parseFloat(e.qtdRacao))) * parseFloat(e.qtdAnimais);
    });
    if (data.length == 0) {
        return parseFloat("0.00");
    }

    return soma;
}

export async function calculaConsumoTotal() {
    const data: any[] = await getFoodPlan();
    let soma = 0;

    data.forEach(e => {
        soma += parseFloat(e.qtdVolumoso) + parseFloat(e.qtdRacao);
    });
    if (data.length == 0) {
        return parseFloat("0.00");
    }

    return soma;
}
