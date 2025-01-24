// File: src/app/premises/new/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputForm from "@/components/input-form";
import HeaderPage from "@/components/header-page";

const formSchema = z.object({
    name: z.string().min(1, "O nome da premissa é obrigatório"),
    category: z.string().min(1, "A categoria é obrigatória"),
    year: z.number().int().positive("O ano deve ser um número positivo").lte(new Date().getFullYear() + 10, "O ano não pode ser muito no futuro"),
});

export default function NewPremise() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            category: "",
            year: new Date().getFullYear(),
        },
        mode: "onChange", // Valida em tempo real
    })

    const [error, setError] = useState("");
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setError("");
        setIsSubmitting(true);

        try {
            await api.post("/premises", values);
            alert("Premissa cadastrada com sucesso!");
            router.push("/premises");
        } catch (err: any) {
            console.error("Erro ao cadastrar premissa:", err.response?.data || err.message);
            setError(err.response?.data?.error || "Erro ao cadastrar premissa");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <HeaderPage
                breadcrumbItems={[{label: "Premissas", href: "/premises"}]}
                currentPage="Cadastro de premissas"
            />
            
            {error && <p className="text-red-600 mb-4">{error}</p>}

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <InputForm 
                        label="Premissa"
                        placeholder="DIgite o nome da premissa"
                        type="text"
                        name="name"
                        control={form.control}
                    />
                    
                    <InputForm 
                        label="Categoria"
                        placeholder="DIgite a categoria da premissa"
                        type="text"
                        name="category"
                        control={form.control}
                    />

                    <InputForm 
                        label="Ano"
                        placeholder="Informe o ano da premissa"
                        type="number"
                        name="year"
                        control={form.control}
                        onChange={(e) => {
                            const value = Number(e.target.value); // Garante que o valor seja convertido para número
                            form.setValue("year", value); // Atualiza o valor manualmente no react-hook-form
                        }}
                        
                    />

                    <Button type="submit" disabled={!form.formState.isValid}>
                        {isSubmitting ? "Enviando..." : "Cadastrar"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
