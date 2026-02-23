// import { NextRequest, NextResponse } from "next/server";
// import { adminAuth, adminDB } from "@/services/firebaseAdmin";

// export async function POST(request: NextRequest) {
//   try {
//     const {
//       name,
//       email,
//       phone,
//       farmName,
//       farmSize,
//       password,
//       acceptTerms,
//     } = await request.json();

//     // Validações básicas
//     if (!email || !password || !name) {
//       return NextResponse.json(
//         { error: "Dados obrigatórios não informados" },
//         { status: 400 }
//       );
//     }

//     if (!acceptTerms) {
//       return NextResponse.json(
//         { error: "É necessário aceitar os termos" },
//         { status: 400 }
//       );
//     }

//     // Criar usuário no Firebase Auth
//     const user = await adminAuth.createUser({
//       email,
//       password,
//       displayName: name,
//       phoneNumber: phone || undefined,
//     });

//     // Salvar dados adicionais no banco
//     await adminDB.ref(`users/${user.uid}`).set({
//       name,
//       email,
//       phone,
//       farmName,
//       farmSize,
//       createdAt: new Date().toISOString(),
//     });

//     return NextResponse.json(
//       { message: "Usuário criado com sucesso" },
//       { status: 201 }
//     );
//   } catch (error: any) {
//     console.error("REGISTER ERROR:", error);

//     if (error.code === "auth/email-already-exists") {
//       return NextResponse.json(
//         { error: "Email já cadastrado" },
//         { status: 409 }
//       );
//     }

//     return NextResponse.json(
//       { error: "Erro interno no servidor" },
//       { status: 500 }
//     );
//   }
// }
