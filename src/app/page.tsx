
"use client"
// File: src/app/dashboard/page.tsx

import { metadata } from "@/app/metadata";
import { ModeToggle } from "@/components/dark-mode";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect } from "react";

export default function Dashboard() {

  useEffect(() => {
    document.title = metadata.dashboard.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", metadata.dashboard.description);
  }, []);

  return (
    <>
      <header className="flex items-center justify-between border-b px-4">
        <div className="flex sticky top-0 bg-background  h-16 shrink-0 items-center gap-2 ">
          <SidebarTrigger className="ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Home</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <ModeToggle />
      </header>
      {/* <h1 className="text-3xl font-bold text-primary">Dashboard</h1> */}
      <div className="mt-6 ml-6 mr-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-sidebar-accent rounded shadow-2xl">
          <h2 className="text-lg text-primary font-bold">Resumo Financeiro</h2>
          <p className="mt-2 text-primary">Total de Orçamento: R$ 1.000.000,00</p>
        </div>
        <div className="p-4 bg-sidebar-accent rounded shadow-2xl">
          <h2 className="text-lg text-primary font-bold">Funcionários</h2>
          <p className="mt-2 text-primary">Total: 120</p>
        </div>
        <div className="p-4 bg-sidebar-accent rounded shadow-2xl">
          <h2 className="text-lg text-primary font-bold">Empresas</h2>
          <p className="mt-2 text-primary">Total: 10</p>
        </div>
      </div>
    </>
  );
}
