// File: src/app/page.tsx (Landing page)

"use client"

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Topbar } from "@/components/public/topbar";
import { Footer } from "@/components/public/footer";
import { useEffect, useState } from "react";
import slides from "@/constants/slides";
import { metadata } from "@/app/metadata";
import Image from "next/image";

export default function LandingPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Alterna o slide a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    document.title = metadata.home.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", metadata.home.description);
  }, []);

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
      {/* Espaço para compensar o header fixo */}
      <div className="h-20 "></div>
      {/* Seção: Carousel / Início */}
      <section id="inicio" className="relative h-[500px] rounded-xl px-4">
        <div className="relative w-full h-full overflow-hidden rounded-xl">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <Image src={slide.image} alt={slide.title} layout="fill" objectFit="cover" />
              {/* Sobreposição para realçar o texto */}
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h1 className="text-5xl font-bold">{slide.title}</h1>
                <p className="mt-4 text-2xl">{slide.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seção: Sobre */}
      <section id="about" className="flex items-center py-20 h-96">
        <div className="container w-1/2 mx-auto px-4 p-32 rounded-xl">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Sobre o Plannus
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            O Plannus é o sistema de gestão de orçamento empresarial que facilita o controle e o planejamento estratégico da sua empresa.
          </p>
          {/* <Button className="mt-6" onClick={() => router.push("/login")}>
            Acessar o Sistema
          </Button> */}
        </div>
      </section>

      {/* Seção: Funcionamento */}
      <section id="features" className="flex items-center justify-center h-96">
        <div className="container w-1/2 mx-auto px-4 p-32 rounded-xl text-end">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Funcionamento
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Descubra como o sistema funciona, suas funcionalidades e como ele pode ajudar a otimizar os processos de sua empresa.
          </p>
        </div>
      </section>

      {/* Seção: Contato */}
      <section id="contact" className="flex items-center justify-start h-96">
        <div className="container w-1/2 mx-auto px-4 p-32 rounded-xl text-start">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Contato
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Entre em contato para mais informações. Email: contato@plannus.com | Telefone: (XX) XXXX-XXXX.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}