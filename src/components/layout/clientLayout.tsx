// File: src/components/layout/clientLayout.tsx

"use client"

import { usePathname } from "next/navigation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/private/app-sidebar";
import { Toaster } from "@/components/ui/toaster";

export function ClientLayout({ children, defaultOpen }: { children: React.ReactNode; defaultOpen: boolean }) {
    const pathname = usePathname();
    const isPublicPage = ["/", "/landing", "/login"].includes(pathname);

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
        {!isPublicPage && <AppSidebar />}
        <SidebarInset>
            <main className="min-h-screen">
                <Toaster />
                {children}
            </main>
        </SidebarInset>
        </SidebarProvider>
    );
}
