// File: src/components/login-form.tsx

"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true);

    if (!username || !password) {
      toast({
        title: "Erro!",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Usuário ou senha inválidos.")
      }

      const data = await response.json()
      localStorage.setItem("token", data.token);
      document.cookie = `token=${data.token}; Path=/; Secure; SameSite=Strict`;
      setUser(data.user);

      toast({
        title: "Sucesso!",
        description: "Login realizado com sucesso!",
        variant: "success",
      });

      router.push("/dashboard");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      toast({
        title: "Erro!",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Faça login na sua conta</h1>
        <p className="text-balance text-sm text-slate-500 dark:text-slate-400">
          Digite seu nome de usuário abaixo para acessar sua conta
        </p>
      </div>

      <div className="grid gap-6">

        <div className="grid gap-2">
          <Label htmlFor="username">Usuário</Label>
          <Input
            id="username"
            type="text"
            placeholder="seu nome de usuário"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="digite sua senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "autenticando..." : "Login"}
        </Button>
        <Button variant="destructive" className="w-full">
          <Link href={"/"} className="w-full" >
            Cancelar
          </Link>
        </Button>
      </div>
    </form>
  )
}