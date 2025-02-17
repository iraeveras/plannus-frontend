// File: src/components/forms/tab-item.tsx
import { TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import React from "react";

interface TabItemProps extends React.ComponentPropsWithoutRef<typeof TabsTrigger> {
    label: string;
    className?: string;
}

export function TabItem({ label, className, ...props }: TabItemProps) {
    return (
        <TabsTrigger
        className={cn(
            "px-0 py-2 text-sm font-medium border-b-transparent focus-visible:text-teal-600 transition-colors focus:outline-none",
            "data-[state=active]:text-teal-600 data-[state=active]:border-b-2 data-[state=active]:border-teal-500 dark:data-[state=active]:text-teal-600 dark:data-[state=active]:border-teal-600",
            className
        )}
        {...props}
        >
        {label}
        </TabsTrigger>
    );
}