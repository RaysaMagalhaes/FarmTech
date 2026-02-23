import { NextRequest, NextResponse } from "next/server";
import { database } from "../../../../services/firebaseClient";
import { ref, update } from "firebase/database";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "ID é obrigatório" },
        { status: 400 }
      );
    }

    const animalRef = ref(database, `Rebanho/${id}`);

    await update(animalRef, body);

    return NextResponse.json(
      { message: "Animal atualizado com sucesso" },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Erro ao atualizar:", error.message);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
