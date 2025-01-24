// File: src/components/header-page.tsx
"use client"

import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ModeToggle } from "@/components/dark-mode";

interface HeaderPageProps {
    breadcrumbItems?: { label: string; href?: string }[];
    currentPage?: string;
}

const HeaderPage: React.FC<HeaderPageProps> = ({ breadcrumbItems, currentPage }) => {
    return (
        <header className="flex items-center justify-between border-b px-4">
            <div className="flex sticky top-0 bg-background  h-16 shrink-0 items-center gap-2 ">
                <SidebarTrigger className="ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        {breadcrumbItems?.map((item, index) => (
                            <BreadcrumbItem key={index} className="hidden md:block">
                                {item.href ? (
                                    <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                                ) : (
                                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                )}
                            </BreadcrumbItem>
                        ))}
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbPage>{currentPage}</BreadcrumbPage>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <ModeToggle />
        </header>
    );
};

export default HeaderPage;