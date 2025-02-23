// File: src/app/(private)/(admin)/settings/role/edit-role-form.tsx
"use client";

import React, { useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import InputForm from "@/components/forms/input-form";
import { CustomForm } from "@/components/forms/custom-form";
import { Checkbox } from "@/components/ui/checkbox";

// Schema para edição do role
const editRoleSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    description: z.string().optional(),
    // As permissões serão recebidas como um objeto, onde cada chave é o permissionId e o valor é um objeto com as ações
    permissions: z
    .record(
        z.object({
            view: z.boolean(),
            create: z.boolean(),
            edit: z.boolean(),
            delete: z.boolean(),
            selectAll: z.boolean(),
        })
    )
    .optional(),
});

type EditRoleFormValues = z.infer<typeof editRoleSchema>;

interface EditRoleFormProps {
    initialData: EditRoleFormValues & { id: string; rolePermissions?: any[] };
    onRoleUpdated: (updatedRole: any) => void;
    onClose: () => void;
}

const permissionActions = [
    { key: "view", label: "Visualizar" },
    { key: "create", label: "Criar" },
    { key: "edit", label: "Editar" },
    { key: "delete", label: "Deletar" },
    { key: "selectAll", label: "Selecionar Todos" },
];

export default function EditRoleForm({ initialData, onClose, onRoleUpdated }: EditRoleFormProps) {
    const { toast } = useToast();

    // Definindo o tipo esperado para as permissões transformadas
    type PermissionActionsType = {
        view: boolean;
        create: boolean;
        edit: boolean;
        delete: boolean;
        selectAll: boolean;
    };

    // Transforma o array de rolePermissions (se existir) no objeto esperado pelo formulário
    const transformedPermissions = useMemo<Record<string, PermissionActionsType>>(() => {
        if (initialData.rolePermissions && Array.isArray(initialData.rolePermissions)) {
            return initialData.rolePermissions.reduce((acc, rp) => {
            // rp.permission.id deve existir no objeto rp
            acc[rp.permission.id] = {
                view: rp.view,
                create: rp.create,
                edit: rp.edit,
                delete: rp.delete,
                selectAll: rp.selectAll,
            };
            return acc;
            }, {} as Record<string, PermissionActionsType>);
        }
        return {};
    }, [initialData.rolePermissions]);

    const { control, handleSubmit, reset, setValue } = useForm<EditRoleFormValues>({
    resolver: zodResolver(editRoleSchema),
    defaultValues: {
        name: initialData.name || "",
        description: initialData.description || "",
        permissions: transformedPermissions,
    },
    mode: "onChange",
    });

  // Se o initialData mudar, reinicia os valores do formulário
    useEffect(() => {
        reset({
            name: initialData.name || "",
            description: initialData.description || "",
            permissions: transformedPermissions,
        });
    }, [initialData, transformedPermissions, reset]);

    const onSubmit = async (values: EditRoleFormValues) => {
        // Converte o objeto de permissões em array
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
    };

    try {
        const response = await api.put(`/roles/${initialData.id}`, payload);
            toast({
            title: "Sucesso",
            description: "Role atualizado com sucesso!",
            variant: "success",
        });
        onRoleUpdated(response.data.role);
        onClose();
    } catch (error: any) {
        toast({
            title: "Erro",
            description: "Erro ao atualizar role.",
            variant: "destructive",
        });
        }
    };

    return (
        <div className="p-4 border rounded">
            <h2 className="text-2xl font-bold mb-4">Editar Role</h2>
            <CustomForm form={{ control, handleSubmit, reset } as any}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                        <InputForm
                        label="Nome do Role"
                        placeholder="Ex: admin"
                        type="text"
                        name="name"
                        control={control}
                        />
                        <InputForm
                        label="Descrição"
                        placeholder="Descrição do role"
                        type="text"
                        name="description"
                        control={control}
                        />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium mb-2">Definir Permissões</h3>
                        {/* Aqui você pode iterar sobre as permissões disponíveis */}
                        {/* Para simplificar, neste exemplo, supomos que o formulário só manipula as permissões já presentes no initialData */}
                        {Object.keys(transformedPermissions).length === 0 ? (
                            <p className="text-gray-500">Nenhuma permissão configurada.</p>
                        ) : (
                            Object.entries(transformedPermissions).map(([permId, actions]) => (
                                <div key={permId} className="border p-2 rounded mb-2">
                                    <p className="font-semibold">Permissão: {permId}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {permissionActions.map((action) => (
                                            <div key={action.key} className="flex items-center space-x-1">
                                                <Controller
                                                    control={control}
                                                    name={`permissions.${permId}.${action.key}` as any}
                                                    defaultValue={actions[action.key as keyof PermissionActionsType] || false}
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
                            ))
                        )}
                    </div>
                    <div className="flex items-center justify-end">
                        <Button type="submit">Salvar Alterações</Button>
                    </div>
                </form>
            </CustomForm>
        </div>
    );
}