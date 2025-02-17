// File: src/app/(private)/(admin)/settings/page.tsx
"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TabItem } from "@/components/forms/tabs/tab-item";
import HeaderPage from "@/components/private/header-page";
import UserConfigurationsTabs from "./user-configurations-tabs";

export default function SettingsPage() {
    return (
        <>
            <HeaderPage
                breadcrumbItems={[{ label: "Home", href: "/dashboard" }]}
                currentPage="Configurações"
            />
            <div className="p-6">
                <h1 className="text-xl font-medium text-zinc-900 dark:text-zinc-100 mb-4">⚙️ Configurações</h1>
                <Tabs defaultValue="users">
                    <TabsList className="flex text-neutral-400 scroll-smooth">
                        <TabItem label="Usuários" value="users" />
                        <TabItem label="Conta" value="account" />
                        <TabItem label="Notificações" value="notifications" />
                        <TabItem label="Outras" value="others" />
                    </TabsList>
                    <TabsContent value="users" className="py-3 transition-opacity duration-300 ease-in-out">
                        <UserConfigurationsTabs />
                    </TabsContent>
                    <TabsContent value="account" className="p-3 transition-opacity duration-300 ease-in-out">
                        <p>Configurações da conta...</p>
                    </TabsContent>
                    <TabsContent value="notifications" className="p-3 transition-opacity duration-300 ease-in-out">
                        <p>Configurações de notificações...</p>
                    </TabsContent>
                    <TabsContent value="others" className="p-3 transition-opacity duration-300 ease-in-out">
                        <p>Outras configurações...</p>
                    </TabsContent>
                </Tabs>
            </div>
        </>
        
    );
}
