// File: src/app/(private)/(admin)/users/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api"; // Sua instância Axios com interceptor
import { metadata } from "@/app/metadata";
import HeaderPage from "@/components/private/header-page";
import { FilePenLine, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DataTable from "@/components/data-display/data-table";
import Link from "next/link";

interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    role: string;
    status: string;
}

export default function UsersList() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { toast } = useToast();

    useEffect(() => {
        document.title = metadata.listUsers.title;
        document
            .querySelector('meta[name="description"]')
            ?.setAttribute("content", metadata.listUsers.description);
    }, []);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await api.get("/users");
                setUsers(response.data);
            } catch (error: any) {
                toast({
                    title: "Erro",
                    description: "Erro ao buscar usuários.",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, [toast]);

    const columns = [
        { key: "name", label: "Nome", sortable: true, filterable: true },
        { key: "username", label: "Nome de usuário", sortable: true, filterable: true },
        { key: "email", label: "E-mail", sortable: true, filterable: true },
        { key: "role", label: "Papel", sortable: true, filterable: true },
        { key: "status", label: "Status", sortable: true, filterable: true },
    ] as const;

    return (
        <>
            <HeaderPage
                breadcrumbItems={[{ label: "Cadastro de Usuário", href: "/users/new" }]}
                currentPage="Lista de Usuários"
            />
            <div className="p-6">
                <DataTable<User>
                    data={users}
                    columns={[...columns]}
                    actions={(row) => (
                        <>
                            <FilePenLine className="cursor-pointer text-blue-400 hover:text-blue-500" />
                            <Trash2 className="cursor-pointer text-red-400 hover:text-red-500" />
                        </>
                    )}
                />
            </div>
        </>
    );
}