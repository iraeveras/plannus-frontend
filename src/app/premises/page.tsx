"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import Title from "@/components/Title";
import Table from "@/components/Table";
import { metadata } from "@/app/metadata";
import HeaderPage from "@/components/header-page";

export default function PremisesList() {
    const [premises, setPremises] = useState([]);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        document.title = metadata.listPremises.title;
        document
            .querySelector('meta[name="description"]')
            ?.setAttribute("content", metadata.listPremises.description);
    }, []);

    // Buscar premissas
    useEffect(() => {
        const fetchPremises = async () => {
            try {
                const response = await api.get("/premises");
                setPremises(response.data);
            } catch (err) {
                console.error("Erro ao buscar premissas:", err);
                setError("Erro ao carregar premissas.");
            }
        };
        fetchPremises();
    }, []);

    // Excluir premissa
    const handleDelete = async (id: string) => {
        if (!confirm("Tem certeza que deseja excluir esta premissa?")) return;

        try {
            await api.delete(`/premises/${id}`);
            setPremises(premises.filter((premise: any) => premise.id !== id));
        } catch (err) {
            console.error("Erro ao excluir premissa:", err);
            setError("Erro ao excluir a premissa.");
        }
    };

    // Redirecionar para edição
    const handleEdit = (id: string) => {
        router.push(`/premises/edit/${id}`);
    };

    const headers = ["Nome", "Categoria", "Ano", "Ações"];

    return (
        <main className="min-h-screen">
            <HeaderPage
                breadcrumbItems={[{label: "Cadastro de premissas", href: "/premises/new"}]}
                currentPage="Lista de premissas"
            />
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <div className="p-6">
                <Table
                    headers={headers}
                    data={premises}
                    renderRow={(item) => (
                        <>
                            <td className="px-4 py-2">{item.name}</td>
                            <td className="px-4 py-2">{item.category}</td>
                            <td className="px-4 py-2">{item.year}</td>
                            <td className="px-4 py-2">
                                <button
                                    onClick={() => handleEdit(item.id)}
                                    className="text-blue-500 hover:underline"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="text-red-500 hover:underline ml-4"
                                >
                                    Excluir
                                </button>
                            </td>
                        </>
                    )}
                />
            </div>
            
        </main>
    );
}
