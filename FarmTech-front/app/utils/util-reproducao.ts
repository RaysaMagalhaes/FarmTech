import { stat } from "fs";
import { getAnimalInfo } from "./util-animals";


// =============================
// 🔥 Funções extras
// =============================
export async function basicDadosPrenhhez() {
    const animais: AnimalData[] = await getAnimalInfo();
    const converted = Object.values(animais);
    const prenhas = converted.filter(animal => animal.prenha === "prenha").length;
    const agendadas = converted.filter(animal => animal.prenha === "agendada").length;
    const preNatal = converted.filter(animal => animal.prenha === "prenatal").length;
    const total = converted.length;
    const taxa = total > 0 ? (prenhas / total * 100).toFixed(2) : "0.00";

    const data = {
        statusData: [
            { status: "Prenhas", count: prenhas + preNatal },
            { status: "Vazias", count: total - prenhas - preNatal },
            { status: "Inseminação Agendada", count: agendadas },
            { status: "Pré-Natal", count: preNatal },
        ],
        taxa,
    };
    return data;
}

export async function animaisPrenhas(): Promise<PengrantCows[]> {
    const animais: AnimalData[] = await getAnimalInfo();

    const converted = Object.values(animais);

    const prenhas = converted.filter(
        (animal) => animal.prenha?.toLowerCase() === "prenha" || animal.prenha?.toLowerCase() === "prenatal"
    );
    const pengrantCows: PengrantCows[] = prenhas.map((animal) => {
        const dataInseminacao = new Date(animal.tempoPrenhez);
        const hoje = new Date();

        const diffEmMs = hoje.getTime() - dataInseminacao.getTime();

        const diasGestacao = Math.floor(
            diffEmMs / (1000 * 60 * 60 * 24)
        );

        const previsaoParto = new Date(dataInseminacao);
        previsaoParto.setDate(previsaoParto.getDate() + 280);

        let preparacao: string;
        let status: string;

        if (diasGestacao < 245) {
            preparacao = "Em Andamento";
            status = "Normal";
        } else if (diasGestacao >= 245 && diasGestacao < 280) {
            preparacao = "Pré-Parto";
            status = "Próximo ao Parto";
        } else if (diasGestacao >= 280 && diasGestacao < 290) {
            preparacao = "Completo ou Em Parto";
            status = "Parto Eminente";
        } else {
            preparacao = "Atrasada";
            status = "Atrasada";
        }

        return {
            id: animal.id,
            nome: animal.nome,
            dataInseminacao: animal.tempoPrenhez, // ajuste se tiver campo específico
            previsaoParto: previsaoParto.toISOString().split("T")[0],
            diasGestacao,
            status,
            preparacao,
        };
    });

    return pengrantCows;
}

export async function inseminationSchedule(): Promise<InseminationSchedule[]> {

    const animais: AnimalData[] = await getAnimalInfo();

    const converted = Object.values(animais);

    const vazias = converted.filter(
        (animal) => animal.prenha?.toLowerCase() === "agendada" || animal.prenha?.toLowerCase() === "vazia"
    );

    const schedule: InseminationSchedule[] = vazias.map((animal) => {
        console.log("Animal para agendamento:", animal)
        const ultimoCio = new Date(animal.ultimoCio);
        console.log("ultimoCio:", ultimoCio)
        const proximoCio = new Date(ultimoCio);
        proximoCio.setDate(proximoCio.getDate() + 21);
        const atrasado = new Date(proximoCio);
        atrasado.setDate(atrasado.getDate() + 20);
        console.log("proximoCio:", proximoCio)

        let status: string;
        const hoje = new Date();
        if (hoje > atrasado) {
            status = "Atrasada";
        } else if (hoje > ultimoCio && hoje < proximoCio) {
            status = "Aguardando";
        } else {
            status = "Programada";
        }

        return {
            nome: animal.nome,
            id: animal.id,
            ultimoCio: animal.ultimoCio,
            proximoCio: proximoCio.toISOString().split("T")[0],
            statusPrenhez: animal.prenha,
            status,
        };
    });

    return schedule;

}


