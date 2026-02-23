// =============================
// 🔥 TABELAS CENTRALIZADAS
// =============================

export const SAUDE_TABLES = {
  stats: "SaudeStatus",
  records: "HealthRecords",
  visits: "VisitasVeterinarias",
  vacinas: "VacinacoesFuturas",
} as const;

type SaudeTable = (typeof SAUDE_TABLES)[keyof typeof SAUDE_TABLES];


// =============================
// 🔥 FETCH GENÉRICO (GET)
// =============================

async function fetchWithFirebaseKey<T>(
  table: SaudeTable
): Promise<(T & { firebaseKey: string })[]> {
  const response = await fetch(`/api/saude/${table}`);

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
  table: SaudeTable,
  method: "POST" | "PUT" | "DELETE",
  id?: string,
  data?: T
) {
  const url = id
    ? `/api/saude/${table}/${id}`
    : `/api/saude/${table}`;

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

export const getHealthStats = () =>
  fetchWithFirebaseKey<HealthStats>(SAUDE_TABLES.stats);

export const getHealthRecords = () =>
  fetchWithFirebaseKey<HealthRecord>(SAUDE_TABLES.records);

export const getVeterinaryVisits = () =>
  fetchWithFirebaseKey<VeterinaryVisit>(SAUDE_TABLES.visits);

export const getUpcomingVaccinations = () =>
  fetchWithFirebaseKey<UpcomingVaccinations>(SAUDE_TABLES.vacinas);


// =============================
// 🔥 CREATE (POST)
// =============================

export const createHealthStats = (data: HealthStats) =>
  mutate(SAUDE_TABLES.stats, "POST", undefined, data);

export const createHealthRecord = (data: HealthRecord) =>
  mutate(SAUDE_TABLES.records, "POST", undefined, data);

export const createVeterinaryVisit = (data: VeterinaryVisit) =>
  mutate(SAUDE_TABLES.visits, "POST", undefined, data);

export const createUpcomingVaccination = (data: UpcomingVaccinations) =>
  mutate(SAUDE_TABLES.vacinas, "POST", undefined, data);


// =============================
// 🔥 UPDATE (PUT)
// =============================

export const updateRecord = <T>(
  table: SaudeTable,
  id: string,
  data: T
) => mutate(table, "PUT", id, data);


// =============================
// 🔥 DELETE
// =============================

export const deleteRecord = (
  table: SaudeTable,
  id: string
) => mutate(table, "DELETE", id);
