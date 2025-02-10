// File: src/app/page.tsx (Landing page)

"use client"

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Topbar } from "@/components/public/topbar";
import { Footer } from "@/components/public/footer";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Se o usuário estiver autenticado, redireciona para o dashboard
  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    } else {
      setIsLoading(false);
    }
  }, [user, router]);

  if (isLoading) {
    return <div>Carregando...</div>
  }
  

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />
      <div className="flex-grow flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Bem-vindo ao Plannus
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            O sistema de gestão de orçamento empresarial para controle e planejamento estratégico.
          </p>
          <Button className="mt-6" onClick={() => router.push("/login")}>
            Acessar o Sistema
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}