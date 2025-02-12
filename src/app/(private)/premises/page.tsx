// File: src/app/premises/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { metadata } from "@/app/metadata";
import HeaderPage from "@/components/private/header-page";
import { FilePenLine, Trash2 } from "lucide-react";
import DataTable from "@/components/data-display/data-table";
import { toast } from "@/hooks/use-toast";

type Premise = {
    id: string;
    name: string;
    category: string;
    year: number;
}

export default function PremisesList() {
    const [premises, setPremises] = useState<Premise[]>([]);
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
                console.log(response);

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
            
            toast({
                title: "Sucesso!",
                description: "Premissa excluida com sucesso!",
                variant: "success", // Você pode usar 'destructive' para erro
            });
        } catch (err) {
            console.error("Erro ao excluir premissa:", err);
            toast({
                title: "Erro",
                description: "Erro ao excluir a premissa.",
                variant: "destructive",
            });
        }
    };

    // Redirecionar para edição
    const handleEdit = (id: string) => {
        router.push(`/premises/edit/${id}`);
    };

    const columns = [
        { key: "name", label: "Nome", sortable: true, filterable: true },
        { key: "category", label: "Categoria", sortable: true, filterable: true },
        { key: "year", label: "Ano", sortable: true, filterable: true },
    ] as const;

    return (
        <div>
            <HeaderPage
                breadcrumbItems={[{ label: "Cadastro de premissas", href: "/premises/new" }]}
                currentPage="Lista de premissas"
            />
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <div className="p-6">
                <DataTable<Premise>
                    data={premises}
                    columns={[...columns]}
                    actions={(row) => (
                        <>
                            <FilePenLine className="cursor-pointer text-blue-400 hover:text-blue-500" onClick={() => handleEdit(row.id)} />
                            <Trash2 className="cursor-pointer text-red-400 hover:text-red-500" onClick={() => handleDelete(row.id)} />
                        </>
                    )}
                />
            </div>
        </div>
    );
}
