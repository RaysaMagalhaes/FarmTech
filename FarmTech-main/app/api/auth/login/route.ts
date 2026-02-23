import { NextRequest, NextResponse } from "next/server";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/firebaseClient";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    const token = await user.getIdToken();

    return NextResponse.json(
      {
        uid: user.uid,
        email: user.email,
        token,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erro no login:", error.code);

    return NextResponse.json(
      { error: "Email ou senha inválidos" },
      { status: 401 }
    );
  }
}
