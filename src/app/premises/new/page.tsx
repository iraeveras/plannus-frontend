"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import Input from "@/components/Input";
import Button from "@/components/Button";
import FormWrapper from "@/components/FormWrapper";
import Title from "@/components/Title";

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
            <Title text="Cadastrar Premissa" />
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
                    placeholder="Digite o nome da premissa"
                    required
                />
                <Input
                    type="text"
                    label="Categoria"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="Digite a categoria"
                    required
                />
                <Input
                    type="number"
                    label="Ano"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    placeholder="Digite o ano"
                    required
                />
            
                <Button type="submit" label="Cadastrar" />
            </FormWrapper>
        </main>
    );
}
