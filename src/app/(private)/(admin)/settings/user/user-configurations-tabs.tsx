// File: src/app/(private)/(admin)/settings/user-configurations-tabs.tsx
"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TabSubItem } from "@/components/forms/tabs/tab-subitem";
import UserConfigContent from "./user-config-content";
import { Dot } from "lucide-react"

export default function UserConfigurationsTabs() {
    return (
        <Tabs defaultValue="list" className="px-0 mx-0">
            <TabsList className="flex scroll-smooth rounded-none tracking-wide text-neutral-400 dark:text-neutral-600 bg-transparent dark:bg-transparent">
                <TabSubItem label="• Listar Usuários" value="list" />
                <TabSubItem label="• Atribuir Permissões" value="permissions" />
                <TabSubItem label="• Reset de Senha" value="reset" />
            </TabsList>
            <TabsContent value="list" className="p-3 transition-opacity duration-300 ease-in-out">
                {/* Aqui você renderiza o componente ou conteúdo de listagem de usuários */}
                <UserConfigContent/>
            </TabsContent>
            <TabsContent value="permissions" className="p-3 transition-opacity duration-300 ease-in-out">
                {/* Aqui você renderiza o componente ou formulário para atribuição de permissões */}
                <p>Aqui vai a configuração de permissões para usuários.</p>
            </TabsContent>
            <TabsContent value="reset" className="p-3 transition-opacity duration-300 ease-in-out">
                {/* Aqui você renderiza o formulário de reset de senha */}
                <p>Aqui vai o formulário de reset de senha.</p>
            </TabsContent>
        </Tabs>
    );
}
