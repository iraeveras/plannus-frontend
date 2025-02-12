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

    // ✅ Recupera o usuário do localStorage ao iniciar
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchUserData();
        }
    }, []);

    async function fetchUserData() {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw Error("Token não encontrado.");
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) {
                // Captura o status e a mensagem de erro da API
                const errorData = await res.json().catch(() => ({})); // Tenta extrair o corpo da resposta
                throw new Error(
                    `Erro na requisição: ${res.status} ${res.statusText}. ${errorData.message || ""}`
                );
            }

            const data = await res.json();
            setUser(data.user);
        } catch (error) {
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
        throw new Error("useAuth deve ser usado dentro de um AuthProvider")
    }
    return context
}