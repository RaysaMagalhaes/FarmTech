import { database } from "../../../../services/firebaseClient";
import { child, get, push, ref, set } from "firebase/database";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ tabela: string }> }
) {
  try {
    const { tabela } = await context.params; 
    if (!tabela) {
      return NextResponse.json({ message: "tabela param is required" }, { status: 400 });
    }

    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, tabela));

    if (snapshot.exists()) {
      return NextResponse.json({ data: snapshot.val() }, { status: 200 });
    } else {
      return NextResponse.json({ message: "No data found" }, { status: 404 });
    }
  } catch (error: any) {
    console.error("GET error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  context: { params: Promise<{ tabela: string }> }
) {
  try {
    const { tabela } = await context.params;
    if (!tabela) {
      return NextResponse.json({ message: "tabela param is required" }, { status: 400 });
    }

    const data = await request.json();
    const userRef = push(ref(database, tabela));
    await set(userRef, data);

    return NextResponse.json({ message: "Data saved successfully!" }, { status: 201 });
  } catch (error: any) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
