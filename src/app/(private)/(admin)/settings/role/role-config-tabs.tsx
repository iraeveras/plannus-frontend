"use client"

import React from "react";
import { Tabs, TabsList, TabsContent } from "@/components/ui/tabs";
import { TabSubItem } from "@/components/forms/tabs/tab-subitem";
import RoleForm from "./role-form";
import PermissionTypes from "../permissions/permission-types";
import RoleList from "./role-config-list";

export default function RoleConfigurationsTabs() {
    return (
        <Tabs defaultValue="listRole" className="px-0 mx-0">
            <TabsList className="flex scroll-smooth rounded-none tracking-wide px-1 text-neutral-400 dark:text-neutral-600 bg-transparent dark:bg-transparent">
                <TabSubItem label="• Níveis cadastrados" value="listRole"/>
                <TabSubItem label="• Nível de permissão" value="groupPermissions"/>
                <TabSubItem label="• Tipos de permissões" value="permissionType"/>
            </TabsList>
            <TabsContent value="listRole" className="py-1 transition-opacity duration-300 ease-in-out">
                <RoleList/>
            </TabsContent>
            <TabsContent value="groupPermissions" className="py-1 transition-opacity duration-300 ease-in-out">
                <RoleForm/>
            </TabsContent>
            <TabsContent value="permissionType" className="p-1 transition-opacity duration-300 ease-in-out">
                <PermissionTypes/>
            </TabsContent>
        </Tabs>
    )
}