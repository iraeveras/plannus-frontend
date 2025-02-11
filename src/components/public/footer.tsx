"use client"

import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full flex items-center justify-center border-t bg-white dark:bg-gray-950">
            <div className="flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-6">
                <div className="text-center md:text-left">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        © 2023 Plannus. Todos os direitos reservados.
                    </p>
                </div>
                <nav className="flex items-center gap-6">
                    <Link
                        href="/privacy"
                        className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    >
                        Política de Privacidade
                    </Link>
                    <Link
                        href="/terms"
                        className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    >
                        Termos de Serviço
                    </Link>
                    <Link
                        href="/contact"
                        className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    >
                        Contato
                    </Link>
                </nav>
            </div>
        </footer>
    );
}