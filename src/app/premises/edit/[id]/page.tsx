"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/services/api";
import Input from "@/components/Input";
import Button from "@/components/Button";
import FormWrapper from "@/components/FormWrapper";
import Title from "@/components/Title";

export default function EditPremise() {
    const { id } = useParams(); // Captura o ID da URL
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        year: "",
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
            <Title text="Editar Premissa" />
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <FormWrapper 
                onSubmit={handleSubmit}
            >
                <Input
                type="text" 
                    label="Nome"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Carregando..."
                    required
                />
                <Input
                    type="text"
                    label="Categoria"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="Carregando..."
                    required
                />
                <Input
                    type="number"
                    label="Ano"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    placeholder="Carregando..."
                    required
                />

                <Button type="submit" label="Salvar Alterações" />
            </FormWrapper>
        </main>
    );
}
