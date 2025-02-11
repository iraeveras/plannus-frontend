"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ModeToggle } from "../layout/dark-mode";

export function Topbar() {
    const router = useRouter();

    return (
        <header className="flex items-center justify-center w-full border-b bg-white dark:bg-gray-950">
            <div className="w-full flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-lg font-semibold">Plannus</span>
                </Link>
                <nav className="hidden gap-6 md:flex">
                    <Link
                        href="/"
                        className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    >
                        Início
                    </Link>
                    <Link
                        href="/about"
                        className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    >
                        Sobre
                    </Link>
                    <Link
                        href="/features"
                        className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    >
                        Funcionalidades
                    </Link>
                    <Link
                        href="/contact"
                        className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    >
                        Contato
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Button
                        className="border-none outline-none"
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