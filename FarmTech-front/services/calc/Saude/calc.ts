export function formatDate(date?: string) {
  if (!date) return "—";

  const parsed = new Date(date);

  if (isNaN(parsed.getTime())) return "-";

  return parsed.toLocaleDateString("pt-BR");
}

export function formatCurrency(value: string) {
  const numericValue = value.replace(/\D/g, "");

  const number = Number(numericValue) / 100;

  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}