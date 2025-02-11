"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ModeToggle } from "../layout/dark-mode";

export function Topbar() {
    const router = useRouter();

    // Função para scroll suave para uma seção da página
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="flex items-center justify-center w-full bg-transparent fixed top-0 z-50 ">
            <div className="w-full flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-lg font-semibold">Plannus</span>
                </Link>
                <nav className="hidden gap-6 md:flex">
                    <button
                        onClick={() => scrollToSection('inicio')}

                        className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    >
                        Início
                    </button>
                    <button
                        onClick={() => scrollToSection('about')}

                        className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    >
                        Sobre
                    </button>
                    <button
                        onClick={() => scrollToSection('features')}

                        className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    >
                        Funcionalidades
                    </button>
                    <button
                        onClick={() => scrollToSection('contact')}

                        className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    >
                        Contato
                    </button>
                </nav>
                <div className="flex items-center gap-4">
                    <Button
                        className="border-none outline-none bg-transparent font-semibold"
                        variant="outline"
                        onClick={() => router.push("/login")}
                    >
                        Login
                    </Button>
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
}