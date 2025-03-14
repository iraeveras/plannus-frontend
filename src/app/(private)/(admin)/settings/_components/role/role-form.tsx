// File: src/app/(private)/(admin)/settings/role/role-form.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import InputForm from "@/components/forms/input-form";
// Certifique-se de que o CustomForm é importado do arquivo customizado:
import { CustomForm } from "@/components/forms/custom-form";
import { Checkbox } from "@/components/ui/checkbox";

const roleSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    description: z.string().optional(),
    permissions: z.record(
        z.object({
            view: z.boolean(),
            create: z.boolean(),
            edit: z.boolean(),
            delete: z.boolean(),
            selectAll: z.boolean(),
        })
    ).optional(),
});

type RoleFormValues = z.infer<typeof roleSchema>;

interface Permission {
    id: string;
    name: string;
    description?: string;
}

// Definindo as ações com chave interna e label para exibição
const permissionActions = [
    { key: "view", label: "Visualizar" },
    { key: "create", label: "Criar" },
    { key: "edit", label: "Editar" },
    { key: "delete", label: "Deletar" },
    { key: "selectAll", label: "Selecionar Todos" },
];

export default function RoleForm() {
    const { toast } = useToast();
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const { control, handleSubmit, reset } = useForm<RoleFormValues>({
        resolver: zodResolver(roleSchema),
        defaultValues: {
            name: "",
            description: "",
            permissions: {},
        },
        mode: "onChange",
    });

    useEffect(() => {
        async function fetchPermissions() {
            try {
                const response = await api.get("/users/permissions");
                setPermissions(response.data || []);
            } catch (error: any) {
                toast({
                    title: "Erro",
                    description: "Erro ao buscar permissões.",
                    variant: "destructive",
                });
            }
        }
        fetchPermissions();
    }, [toast]);

    const onSubmit = async (values: RoleFormValues) => {
        const preparedPermissions = Object.entries(values.permissions || {}).map(
            ([permId, actions]) => ({
                permissionId: permId,
                view: actions.view || false,
                create: actions.create || false,
                edit: actions.edit || false,
                delete: actions.delete || false,
                selectAll: actions.selectAll || false,
            })
        );

        const payload = {
            name: values.name,
            description: values.description,
            permissions: preparedPermissions,
        };

        try {
            const response = await api.post("/roles", payload);

            toast({
                title: "Sucesso",
                description: "Role criado com sucesso!",
                variant: "success",
            });
            reset();
        } catch (error: any) {
            toast({
                title: "Erro",
                description: "Erro ao criar role.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="p-4 border rounded">
            <h2 className="text-lg font-bold mb-4">Criar Novo Grupo de permissão</h2>
            <CustomForm form={{ control, handleSubmit, reset } as any}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                        <InputForm
                            label="Nome do grupo de permissão"
                            placeholder="Ex: admin"
                            type="text"
                            name="name"
                            control={control}
                        />
                        <InputForm
                            label="Descrição"
                            placeholder="Ex: Permissão de administrador do sistema"
                            type="text"
                            name="description"
                            control={control}
                        />
                    </div>
                    <div>
                        <h3 className="text-md font-medium mb-2">Definir Permissões</h3>
                        {permissions.length === 0 ? (
                            <p className="text-gray-500">Nenhuma permissão encontrada.</p>
                        ) : (
                            permissions.map((perm) => (
                                <div key={perm.id} className="border p-2 rounded mb-2">
                                    <h4 className="text-neutral-600 font-semibold">{perm.name}</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {perm.description && (
                                            <p className="text-sm text-gray-600">{perm.description}</p>
                                        )}

                                        <div className="flex col-span-2 md:col-span-1 flex-col lg:flex-row gap-2">
                                            {permissionActions.map((action) => (
                                                <div key={action.key} className="flex items-center space-x-1">
                                                    <Controller
                                                        control={control}
                                                        name={`permissions.${perm.id}.${action.key}` as any}
                                                        defaultValue={false}
                                                        render={({ field: { value, onChange } }) => (
                                                            <>
                                                                <Checkbox
                                                                    checked={value}
                                                                    onCheckedChange={(checkedValue) => onChange(checkedValue)}
                                                                />
                                                                <span className="text-xs">{action.label}</span>
                                                            </>
                                                        )}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="flex items-center justify-end">
                        <Button type="submit">Criar Role</Button>
                    </div>
                </form>
            </CustomForm>
        </div>
    );
}