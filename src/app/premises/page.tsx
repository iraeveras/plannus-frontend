"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

export default function PremisesList() {
    const [premises, setPremises] = useState([]);
    const [error, setError] = useState("");
    const router = useRouter();

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

    return (
        <main className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-primary mb-6">Listagem de Premissas</h1>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <table className="w-full bg-white rounded shadow-md overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="text-left p-4">Nome</th>
                        <th className="text-left p-4">Categoria</th>
                        <th className="text-left p-4">Ano</th>
                        <th className="text-left p-4">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {premises.map((premise: any) => (
                        <tr key={premise.id} className="border-b">
                            <td className="p-4">{premise.name}</td>
                            <td className="p-4">{premise.category}</td>
                            <td className="p-4">{premise.year}</td>
                            <td className="p-4">
                                <button
                                    className="text-blue-500 hover:underline mr-4"
                                    onClick={() => handleEdit(premise.id)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="text-red-500 hover:underline"
                                    onClick={() => handleDelete(premise.id)}
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}
