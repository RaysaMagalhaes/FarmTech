"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // async function login(email: string, password: string) {
  //   const res = await fetch("/api/auth/login", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ email, password }),
  //   });

  //   if (!res.ok) {
  //     throw new Error("Login inválido");
  //   }

  //   return res.json();
  // }

  const handleSubmit = async (e: React.FormEvent) => {
    // e.preventDefault();
    // setIsLoading(true);
    // setError(null);

    // try {
    // const data = await login(formData.email, formData.password);

    // 🔐 Salva token e uid
    // localStorage.setItem("token", data.token);
    // localStorage.setItem("uid", data.uid);

    // Redireciona
    window.location.href = "/";
    //   } catch (err) {
    //     setError("Email ou senha inválidos");
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //   setFormData({
    //     ...formData,
    //     [e.target.name]: e.target.value,
    //   });
    // }
  }

  return (
    <div className="min-h-screen bg-[#F7F3E5] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img
              src="/favicon2.png"
              alt="FarmTech Logo"
              className="h-20 w-20"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">FarmTech</h1>
          <p className="text-gray-600 mt-2">
            Gestão Inteligente para sua Fazenda
          </p>
        </div>

        {/* Card */}
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Entrar</CardTitle>
            <CardDescription className="text-center">
              Digite suas credenciais para acessar sua conta
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  // onChange={handleInputChange}
                  required
                  className="h-11"
                />
              </div>

              {/* Senha */}
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    value={formData.password}
                    // onChange={handleInputChange}
                    required
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Erro */}
              {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
              )}

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-600">
                    Lembrar de mim
                  </Label>
                </div>

                <Link
                  href="/forgot-password"
                  className="text-sm text-green-900 hover:underline"
                >
                  Esqueceu a senha?
                </Link>
              </div>

              {/* Botão */}
              <Button
                type="submit"
                className="w-full h-11 bg-green-900 hover:bg-green-700"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            {/* Cadastro */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Não tem uma conta?{" "}
                <Link
                  href="/register"
                  className="text-green-900 font-medium hover:underline"
                >
                  Cadastre-se
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          © 2025 FarmTech. Todos os direitos reservados.
        </div>
      </div>
    </div>
  );
}
