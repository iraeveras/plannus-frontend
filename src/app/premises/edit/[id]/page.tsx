"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/services/api";

export default function EditPremise() {
    const { id } = useParams(); // Captura o ID da URL
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        year: new Date().getFullYear(),
    });
    const [error, setError] = useState("");

    // Buscar dados da premissa pelo ID
    useEffect(() => {
        const fetchPremise = async () => {
            try {
                const response = await api.get(`/premises/${id}`);
                setFormData(response.data); // Certifique-se de que o backend retorna year como um número
            } catch (err) {
                console.error("Erro ao carregar premissa:", err);
            }
        };
        fetchPremise();
    }, [id]);

    // Atualizar campos do formulário
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "year" ? parseInt(value, 10) : value,
        });
    };


    // Submeter alterações
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await api.put(`/premises/${id}`, formData);
            alert("Premissa atualizada com sucesso!");
            router.push("/premises");
        } catch (err: any) {
            console.error("Erro ao atualizar premissa:", err.response?.data || err.message);
            setError(err.response?.data?.error || "Erro ao atualizar a premissa.");
        }
    };

    return (
        <main className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-primary mb-6">Editar Premissa</h1>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Nome</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full mt-1 p-2 border rounded focus:outline-primary"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Categoria</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full mt-1 p-2 border rounded focus:outline-primary"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Ano</label>
                    <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        className="w-full mt-1 p-2 border rounded focus:outline-primary"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
                >
                    Salvar Alterações
                </button>
            </form>
        </main>
    );
}
