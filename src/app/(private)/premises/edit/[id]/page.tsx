"use client"

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { metadata } from "@/app/metadata";
import api from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputForm from "@/components/forms/input-form";
import HeaderPage from "@/components/private/header-page";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
    name: z.string().min(1, "O nome da premissa é obrigatório"),
    category: z.string().min(1, "A categoria é obrigatória"),
    year: z.number().int().positive("O ano deve ser um número positivo"),
});

export default function EditPremise() {
    useEffect(() => {
        document.title = metadata.editPremise.title;
        document
            .querySelector('meta[name="description"]')
            ?.setAttribute("content", metadata.editPremise.description);
    }, []);

    const { id } = useParams();
    const router = useRouter();
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            category: "",
            year: new Date().getFullYear(),
        },
    });

    // Buscar dados da premissa pelo ID
    useEffect(() => {
        const fetchPremise = async () => {
            try {
                const response = await api.get(`/premises/${id}`);
                form.reset(response.data); // Popula o formulário com os dados carregados
            } catch (err) {
                console.error("Erro ao carregar premissa:", err);
                setError("Erro ao carregar os dados.");
            } finally {
                setIsLoading(false)
            }
        };
        fetchPremise();
    }, [id, form]);

    // Submeter alterações
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);

        try {
            await api.put(`/premises/${id}`, values);
            toast({
                title: "Sucesso!",
                description: "Premissa atualizada com sucesso!",
                variant: "success", // Você pode usar 'destructive' para erro
            });
            router.push("/premises");
        } catch (err: any) {
            console.error("Erro ao atualizar premissa:", err.response?.data || err.message);
            toast({
                title: "Erro",
                description: "Ocorreu um erro ao editar a premissa.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <HeaderPage
                breadcrumbItems={[{ label: "Premissas", href: "/premises" }]}
                currentPage="Edição de premissas"
            />
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <div className="p-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <InputForm
                            label="Premissa"
                            placeholder={isLoading ? "Carregando dados..." : "Digite a premissa"}
                            type="text"
                            name="name"
                            control={form.control}
                        />

                        <InputForm
                            label="Categoria"
                            placeholder={isLoading ? "Carregando dados..." : "Digite a premissa"}
                            type="text"
                            name="category"
                            control={form.control}
                        />

                        <InputForm
                            label="Ano"
                            placeholder={isLoading ? "Carregando dados..." : "Digite a premissa"}
                            type="number"
                            name="year"
                            control={form.control}
                            onChange={(e) => {
                                const value = Number(e.target.value); // Garante que o valor seja convertido para número
                                form.setValue("year", value); // Atualiza o valor manualmente no react-hook-form
                            }}
                        />

                        <Button variant="outline" type="submit" disabled={isLoading || isSubmitting}>
                            {isSubmitting ? "Salvando a edição..." : "Salvar Alterações"}                            
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}