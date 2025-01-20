"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

export default function NewPremise() {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        year: new Date().getFullYear(),
    });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "year" ? parseInt(value, 10) : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await api.post("/premises", formData);
            alert("Premissa cadastrada com sucesso!");
            router.push("/premises");
        } catch (err: any) {
            console.error("Erro ao cadastrar premissa:", err.response?.data || err.message);
            setError(err.response?.data?.error || "Erro ao cadastrar premissa");
        }
    };

    return (
        <main className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-primary mb-6">Cadastrar Premissa</h1>
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
                {error && <p className="text-red-600">{error}</p>}
                <button
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
                >
                    Cadastrar
                </button>
            </form>
        </main>
    );
}
