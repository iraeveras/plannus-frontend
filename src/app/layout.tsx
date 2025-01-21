import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '@fontsource/inter/400.css'; // Peso 400 (Normal)
import '@fontsource/inter/500.css'; // Peso 500 (Médio)
import '@fontsource/inter/700.css'; // Peso 700 (Negrito)
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plannus - Sistema de Orçamento",
  description: "Sistema web projetado para gerenciar e controlar o orçamento empresarial anual.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-gray-100">
        <Sidebar />        
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </body>
    </html>
  );
}
