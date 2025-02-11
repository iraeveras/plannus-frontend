// File: src/components/dark-mode.tsx
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
    const { theme, setTheme, systemTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // Evitar hydration mismatch atrasando a renderização até o componente ser montado
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Retornar um estado vazio ou loader até que o tema esteja resolvido no cliente
        return null;
    }

    // Determinar o tema atual
    const currentTheme = theme === "system" ? systemTheme : theme;

    return (
        <Button
            className="border-none outline-none"
            variant="outline"
            size="icon"
            onClick={() =>
                setTheme(currentTheme === "dark" ? "light" : "dark")
            }
            aria-label="Toggle theme"
        >
            {currentTheme === "dark" ? (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
        </Button>
    );
}

