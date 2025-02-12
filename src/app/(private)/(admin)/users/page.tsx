// File: src/app/(private)/(admin)/users/page.tsx
"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api"; // Sua instância Axios com interceptor
import HeaderPage from "@/components/private/header-page";
import { useToast } from "@/hooks/use-toast";
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

    return (
        <>
            <HeaderPage
                breadcrumbItems={[{ label: "Usuários", href: "/admin/users" }]}
                currentPage="Lista de Usuários"
            />
            <div className="p-6">
                {loading ? (
                    <p>Carregando...</p>
                ) : (
                    <div>
                        {users.length === 0 ? (
                            <p>Nenhum usuário encontrado.</p>
                        ) : (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Papel</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.status}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Link href={`/admin/users/${user.id}/edit`}>
                                                    <a className="text-blue-600 hover:text-blue-900">Editar</a>
                                                </Link>
                                                <button
                                                    className="ml-2 text-red-600 hover:text-red-900"
                                                    onClick={async () => {
                                                        if (confirm("Tem certeza que deseja excluir este usuário?")) {
                                                            try {
                                                                await api.delete(`/users/${user.id}`);
                                                                toast({
                                                                    title: "Sucesso",
                                                                    description: "Usuário excluído com sucesso.",
                                                                    variant: "success",
                                                                });
                                                                // Atualiza a lista removendo o usuário excluído
                                                                setUsers((prev) => prev.filter((u) => u.id !== user.id));
                                                            } catch (error: any) {
                                                                toast({
                                                                    title: "Erro",
                                                                    description: "Erro ao excluir o usuário.",
                                                                    variant: "destructive",
                                                                });
                                                            }
                                                        }
                                                    }}
                                                >
                                                    Excluir
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}