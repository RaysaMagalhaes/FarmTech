import { database } from "../../../../../services/firebaseClient";
import { ref, remove, update } from "firebase/database";
import { NextResponse } from "next/server";


export async function PUT(
    request: Request,
    context: { params: Promise<{ tabela: string; id: string }> }
) {
    try {
        const { tabela, id } = await context.params;

        if (!tabela || !id) {
            return NextResponse.json(
                { message: "tabela and id params are required" },
                { status: 400 }
            );
        }

        const body = await request.json();

        const dbRef = ref(database, `${tabela}/${id}`);

        await update(dbRef, body);

        return NextResponse.json(
            { message: "Record updated successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("PUT error:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    context: { params: Promise<{ tabela: string; id: string }> }
) {
    try {
        const { tabela, id } = await context.params;

        if (!tabela || !id) {
            return NextResponse.json(
                { message: "tabela and id params are required" },
                { status: 400 }
            );
        }

        const dbRef = ref(database, `${tabela}/${id}`);

        await remove(dbRef);

        return NextResponse.json(
            { message: "Record deleted successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("DELETE error:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

