// =============================
// 🔥 TABELA BASE
// =============================

const REBANHO_BASE = "/api/rebanho";


// =============================
// 🔥 FETCH GENÉRICO COM FIREBASE KEY
// =============================

async function fetchWithFirebaseKey<T>(
  url: string
): Promise<(T & { firebaseKey: string })[]> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Erro ao buscar dados: ${url}`);
  }

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
// 🔥 MUTATE GENÉRICO
// =============================

async function mutate<T>(
  method: "POST" | "PUT" | "DELETE",
  id?: string,
  data?: T
) {
  const url = id ? `${REBANHO_BASE}/${id}` : REBANHO_BASE;

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
// 🔥 GET - Animal Básico
// =============================

export async function getBasicAnimalInfo(): Promise<BasicAnimal[]> {
  const animals = await fetchWithFirebaseKey<AnimalData>(REBANHO_BASE);

  return animals.map((animal) => ({
    id: animal.id,
    nome: animal.nome,
    status: animal.statusSaude,
    firebaseKey: animal.firebaseKey,
  }));
}


// =============================
// 🔥 GET - Animal Completo
// =============================

export const getAnimalInfo = () =>
  fetchWithFirebaseKey<AnimalData>(REBANHO_BASE);


// =============================
// 🔥 UPDATE
// =============================

export const updateAnimal = (
  key: string,
  updatedData: Partial<Animal>
) => mutate("PUT", key, updatedData);


// =============================
// 🔥 CREATE
// =============================

export const createAnimal = (data: Animal) =>
  mutate("POST", undefined, data);


// =============================
// 🔥 DELETE
// =============================

export const deleteAnimal = (key: string) =>
  mutate("DELETE", key);


