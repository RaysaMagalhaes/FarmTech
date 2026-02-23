"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { createDailyProducao, createHistoricoProducao, getHistoricoProducao, getProducaoDiaria, updateRecord } from "@/app/utils/util-production";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    record?: any;
    create: boolean;
    onSaved: () => void;
};

export function HistoricoProducaoModal({
    open,
    onOpenChange,
    record,
    create,
    onSaved,
}: Props) {

    const [periodo, setPeriodo] = useState("");
    const [data, setData] = useState("");
    const [producao, setProducao] = useState("");
    const [animais, setAnimais] = useState("");
    const [mediaPorAnimal, setMediaPorAnimal] = useState("");
    const [diaSemana, setDiaSemana] = useState("");

    useEffect(() => {
        if (!data) {
            setDiaSemana("");
            return;
        }

        // Evita problema de fuso horário
        const dateObj = new Date(data + "T00:00:00");

        const dias = [
            "Domingo",
            "Segunda-feira",
            "Terça-feira",
            "Quarta-feira",
            "Quinta-feira",
            "Sexta-feira",
            "Sábado",
        ];

        setDiaSemana(dias[dateObj.getDay()]);
    }, [data]);

    async function saveHistorico() {
        try {
            const ordenhasDia = await getProducaoDiaria();
            console.log("Ordenhas do dia:", ordenhasDia);
            if (ordenhasDia.some(ordenha => ordenha.data === data)) {
                const ordenha = ordenhasDia.find(ordenha => ordenha.data === data);
                alert("Já existe um registro para essa data. O sistema irá atualizar a produção total do dia.");
                updateRecord("ProducaoDiaria", ordenha?.firebaseKey || "", {
                    total: (Number(ordenha?.total) || 0) + parseFloat(producao),
                });
            } else {
                const body2: ProdDiaria = {
                    data: data,
                    turno: periodo,
                    total: producao,
                    diaSemana: diaSemana,
                }
                await createDailyProducao(body2);
            }
            const body: HistoricoProducao = {
                periodo,
                producao,
                animais,
                mediaPorAnimal,
                data,
            };

            if (create) {
                await createHistoricoProducao(body);
            } else {
                await updateRecord(
                    "HistoricoProducao",
                    record?.firebaseKey || "",
                    body
                );
            }

            onSaved();
            onOpenChange(false);

        } catch (error) {
            console.log("Erro ao salvar histórico");
        }
    }

    useEffect(() => {
        if (!open) return;

        if (create) {
            setPeriodo("");
            setData("");
            setProducao("");
            setAnimais("");
            setMediaPorAnimal("");
            return;
        }

        if (record) {
            setPeriodo(record.periodo);
            setData(record.data || "");
            setProducao(record.producao);
            setAnimais(record.animais);
            setMediaPorAnimal(record.mediaPorAnimal);
        }

    }, [open, record, create]);

    // 🔥 Cálculo automático da média
    useEffect(() => {
        if (Number(animais) > 0 && Number(producao) > 0) {
            const media = Number(producao) / Number(animais);
            setMediaPorAnimal(media.toFixed(1));
        }
    }, [producao, animais]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Registrar Produção</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">

                    {/* Período */}
                    <div>
                        <Label>Período</Label>
                        <Select value={periodo} onValueChange={setPeriodo}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione o período" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Manhã">Manhã</SelectItem>
                                <SelectItem value="Tarde">Tarde</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Data</Label>
                        <Input
                            type="date"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>Dia da Semana</Label>
                        <Input readOnly value={diaSemana} />
                    </div>

                    {/* Produção */}
                    <div>
                        <Label>Produção (Litros)</Label>
                        <Input
                            type="number"
                            value={producao}
                            onChange={(e) => setProducao(e.target.value)}
                        />
                    </div>

                    {/* Animais */}
                    <div>
                        <Label>Animais Ordenhados</Label>
                        <Input
                            type="number"
                            value={animais}
                            onChange={(e) => setAnimais(e.target.value)}
                        />
                    </div>

                    {/* Média */}
                    <div>
                        <Label>Média por Animal</Label>
                        <Input
                            readOnly
                            value={mediaPorAnimal}
                        />
                    </div>

                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={saveHistorico}
                    >
                        Salvar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}