// File: app/page.tsx
"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import slides from '@/constants/slides';

export default function Landing() {
    // Exemplo de array de slides com URLs reais



    const [currentSlide, setCurrentSlide] = useState(0);

    // Alterna o slide a cada 5 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    // Função para scroll suave para uma seção da página
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Topbar fixado no topo */}
            <header className="w-full bg-white shadow fixed top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Image src="/logo.png" alt="Plannus Logo" width={50} height={50} />
                        <span className="ml-2 font-bold text-xl">Plannus</span>
                    </div>
                    {/* Links de navegação internos */}
                    <nav className="space-x-6">
                        <button onClick={() => scrollToSection('inicio')} className="text-gray-600 hover:text-blue-600 focus:outline-none">
                            Início
                        </button>
                        <button onClick={() => scrollToSection('sobre')} className="text-gray-600 hover:text-blue-600 focus:outline-none">
                            Sobre
                        </button>
                        <button onClick={() => scrollToSection('funcionamento')} className="text-gray-600 hover:text-blue-600 focus:outline-none">
                            Funcionamento
                        </button>
                        <button onClick={() => scrollToSection('contato')} className="text-gray-600 hover:text-blue-600 focus:outline-none">
                            Contato
                        </button>
                    </nav>
                    {/* Botão de Login */}
                    <div>
                        <Link href="/login">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none">
                                Login
                            </button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Espaço para compensar o header fixo */}
            <div className="h-20"></div>

            {/* Seção: Carousel / Início */}
            <section id="inicio" className="relative h-96">
                <div className="relative w-full h-full overflow-hidden">
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
            <section id="sobre" className="py-20 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-4">Sobre o Plannus</h2>
                    <p className="text-gray-700">
                        O Plannus é o sistema de gestão de orçamento empresarial que facilita o controle e o planejamento estratégico da sua empresa.
                    </p>
                </div>
            </section>

            {/* Seção: Funcionamento */}
            <section id="funcionamento" className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-4">Funcionamento</h2>
                    <p className="text-gray-700">
                        Descubra como o sistema funciona, suas funcionalidades e como ele pode ajudar a otimizar os processos de sua empresa.
                    </p>
                </div>
            </section>

            {/* Seção: Contato */}
            <section id="contato" className="py-20 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-4">Contato</h2>
                    <p className="text-gray-700">
                        Entre em contato para mais informações. Email: contato@plannus.com | Telefone: (XX) XXXX-XXXX
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-6">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; {new Date().getFullYear()} Plannus. Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    );
}