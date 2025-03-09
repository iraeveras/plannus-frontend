// File: src/context/AuthContext.tsx
"use client"

import { createContext, useState, useEffect, useContext, ReactNode } from "react"
import { useRouter } from "next/navigation";
import { User } from "@/types/User";

interface AuthContextType {
    user: User | null
    setUser: (user: User | null) => void
    logout: () => void
}

// Criando o contexto e definindo um valor inicial vazio
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provedor de Autenticação
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const router = useRouter()

    // Recupera o token do localStorage ao iniciar
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            let token = storedToken;
            // Tenta fazer o parse caso o token tenha sido armazenado erroneamente como objeto JSON
            try {
                const parsed = JSON.parse(storedToken);
                if (typeof parsed === "string") {
                token = parsed;
                }
            } catch (err) {
                // Se o parse falhar, assume que storedToken já é uma string válida
            }
            fetchUserData(token);
        }
    }, []);

    async function fetchUserData(token: string) {
        try {
            
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) {
                // Tenta extrair o corpo da resposta para obter a mensagem de erro
                const errorData = await res.json().catch(() => ({}));
                throw new Error(
                    `Erro na requisição: ${res.status} ${res.statusText}. ${errorData.message || ""}`
                );
            }

            const data = await res.json();
            setUser(data.user);
        } catch (error: any) {
            console.error("Erro ao buscar dados do usuário:", error);
            logout();
        }
    }

    function logout() {
        localStorage.removeItem("token");
        document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;";
        setUser(null)
        router.push("/")
    }

    // forçar o redirecionamento caso o usuário precise alterar a senha
    useEffect(() => {
        // Se o usuário estiver autenticado e precisar alterar a senha...
        if (user && user.mustChangePassword) {
            // ...e se a rota atual não for a página de alteração de senha, redirecione
            if (window.location.pathname !== "/login") {
                router.push("/login");
            }
        }
    }, [user, router]);

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook personalizado para usar o contexto
export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context
}