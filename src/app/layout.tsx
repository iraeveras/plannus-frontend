"use client"

import { useState } from "react";
import '@fontsource/inter/400.css'; // Peso 400 (Normal)
import '@fontsource/inter/500.css'; // Peso 500 (Médio)
import '@fontsource/inter/700.css'; // Peso 700 (Negrito)
import Sidebar from "@/components/Sidebar";
import { RiMenuUnfold3Line } from "react-icons/ri";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <html lang="en">
      <body className="flex h-screen bg-gray-100">
        {/* Botão para abrir/fechar no mobile */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="fixed top-4 left-2 z-50 bg-primary text-white p-2 rounded md:hidden"
        >
          <RiMenuUnfold3Line />
        </button>

        {/* Sidebar */}
        <div
          className={`fixed md:static z-40 bg-gray-800 text-white transition-transform ${isMobileOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0`}
        >
          <Sidebar />
        </div>

        {/* Conteúdo Principal */}
        <main className="flex-1 px-6 overflow-y-auto">{children}</main>
      </body>
    </html>
  );
}
