// File: src/components/forms/tab-item.tsx
import { TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import React from "react";

interface TabItemProps extends React.ComponentPropsWithoutRef<typeof TabsTrigger> {
    label: string;
    className?: string;
}

export function TabSubItem({ label, className, ...props }: TabItemProps) {
    return (
        <TabsTrigger
            className={cn(
                "px-0 py-2 text-xs font-medium transition-colors focus:outline-none",
                "data-[state=active]:text-neutral-700 data-[state=active]:border-b-2 border-b-transparent data-[state=active]:border-neutral-500 dark:data-[state=active]:text-neutral-300 dark:data-[state=active]:border-neutral-100",
                className
            )}
            {...props}
        >
            {label}
        </TabsTrigger>
    );
}