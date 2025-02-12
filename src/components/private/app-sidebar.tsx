// File: src/components/private/app-sidebar.tsx

"use client"

import * as React from "react";
import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
    SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/private/nav-main";
import { NavProjects } from "@/components/private/nav-projects";
import { NavSecondary } from "@/components/private/nav-secondary";
import { NavUser } from "@/components/private/nav-user";
import { useAuth } from "@/context/AuthContext";
import data from "@/constants/menu-items";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user, logout } = useAuth();

    return (
        <Sidebar collapsible="icon" variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <img
                                        src="/logo.png"
                                        alt="Plannus Logo"
                                        className="h-10 w-10 rounded"
                                    />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">Plannus</span>
                                    <span className="truncate text-xs">Orçamento Empresarial</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects projects={data.projects} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} logout={logout} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
