// File: src/app/(private)/(admin)/settings/permissions/PermissionTypes.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import InputForm from "@/components/forms/input-form";
import { CustomForm } from "@/components/forms/custom-form";

//
// Schema para criação de tipo de permissão
//
const permissionTypeSchema = z.object({
    name: z.string().min(1, "O nome da permissão é obrigatório"),
    description: z.string().optional(),
});

type PermissionTypeFormValues = z.infer<typeof permissionTypeSchema>;

//
// Tipo para Permissão
//
interface Permission {
    id: string;
    name: string;
    description?: string;
}

export default function PermissionTypes() {
    const { toast } = useToast();
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Configuração do formulário para criar nova permissão
    const form = useForm<PermissionTypeFormValues>({
        resolver: zodResolver(permissionTypeSchema),
        defaultValues: {
            name: "",
            description: "",
        },
        mode: "onChange",
    });

    // Carregar as permissões existentes
    useEffect(() => {
        async function fetchPermissions() {
            try {
                const response = await api.get("/users/permissions");
                setPermissions(response.data || []);
            } catch (error: any) {
                if (error.response?.status === 404) {
                    setPermissions([]);
                } else {
                    toast({
                        title: "Erro",
                        description: "Erro ao buscar permissões.",
                        variant: "destructive",
                    });
                }
            } finally {
                setLoading(false);
            }
        }
        fetchPermissions();
    }, [toast]);

    // Função para submeter o formulário de nova permissão
    const onSubmit = async (values: PermissionTypeFormValues) => {
        try {
            // Se description for uma string vazia, removê-la do payload
            const payload = { ...values };
            if (payload.description === "") {
                delete payload.description;
            }
            const response = await api.post("/users/permissions", payload);
            toast({
                title: "Sucesso",
                description: "Permissão criada com sucesso!",
                variant: "success",
            });
            // Atualiza a lista de permissões adicionando a nova permissão
            setPermissions((prev) => [...prev, response.data]);
            form.reset();
        } catch (error: any) {
            toast({
                title: "Erro",
                description: "Ocorreu um erro ao criar a permissão.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-sm text-neutral-500 font-medium">Gerenciar Tipos de Permissões</h2>
            {/* Formulário para criação de nova permissão */}
            <div className="p-4 border rounded">
                <h3 className="text-lg font-semibold mb-4">Criar Nova Permissão</h3>
                <CustomForm form={form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <InputForm
                            label="Nome da Permissão"
                            placeholder="Digite o nome"
                            type="text"
                            name="name"
                            control={form.control}
                        />
                        <InputForm
                            label="Descrição"
                            placeholder="Digite uma descrição (opcional)"
                            type="text"
                            name="description"
                            control={form.control}
                        />
                        <div className="flex items-center justify-end space-x-4">
                            <Button type="submit">Criar Permissão</Button>
                        </div>
                    </form>
                </CustomForm>
            </div>

            {/* Listagem de permissões */}
            <div className="p-4 border rounded">
                <h3 className="text-lg font-semibold mb-4">Permissões Existentes</h3>
                {loading ? (
                    <p>Carregando permissões...</p>
                ) : permissions.length === 0 ? (
                    <p className="text-gray-500">Nenhuma permissão cadastrada.</p>
                ) : (
                    <ul className="space-y-2">
                        {permissions.map((perm, index) => (
                            <li key={`${perm.id}-${index}`} className="p-2 border rounded flex justify-between items-center">
                                <div>
                                    <p className="font-medium">{perm.name}</p>
                                    {perm.description && <p className="text-sm text-gray-600">{perm.description}</p>}
                                </div>
                                {/* Aqui você pode adicionar botões para editar/excluir, se necessário */}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}