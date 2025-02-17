// File: src/app/(private)/(admin)/settings/permissions/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import SelectForm from "@/components/forms/select-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CustomForm } from "@/components/forms/custom-form";
import Link from "next/link";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import EditUserForm from "./user-config-edit";

// Schema para o formulário de atribuição de permissões
const permissionsSchema = z.object({
    userId: z.string().min(1, "Selecione um usuário"),
    permissionIds: z.array(z.string()),
});

type PermissionsFormValues = z.infer<typeof permissionsSchema>;

// Tipos para usuário e permissão
interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    role: "admin" | "managerGeafi" | "managerGerop" | "managerGemkt" | "supervisor" | "user";
    status: "active" | "inactive";
    avatarURL?: string;
}

interface Permission {
    id: string;
    name: string;
    description: string;
}

export default function AssignPermissionsPage() {
    const { toast } = useToast();
    const [users, setUsers] = useState<User[]>([]);
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedUserPermissions, setSelectedUserPermissions] = useState<string[]>([]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState<User | null>(null);

    // Carregar usuários
    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await api.get("/users");
                setUsers(response.data);
            } catch (error: any) {
                toast({
                    title: "Erro",
                    description: "Erro ao buscar usuários.",
                    variant: "destructive",
                });
            }
        }
        fetchUsers();
    }, [toast]);

    // Carregar todas as permissões do sistema
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
            }
        }
        fetchPermissions();
    }, [toast]);

    const form = useForm<PermissionsFormValues>({
        resolver: zodResolver(permissionsSchema),
        defaultValues: {
            userId: "",
            permissionIds: [],
        },
        mode: "onChange",
    });

    // Quando o usuário selecionado mudar, carregar suas permissões já atribuídas
    const selectedUserId = form.watch("userId");

    useEffect(() => {
        if (selectedUserId) {
            async function fetchUserPermissions() {
                try {
                    const response = await api.get(`/users/${selectedUserId}/permissions`);
                    // Supondo que o endpoint retorne uma lista de permissões com o campo "id"
                    const userPermissionIds = response.data.map((perm: any) => perm.id);
                    setSelectedUserPermissions(userPermissionIds || []);
                    form.setValue("permissionIds", userPermissionIds);
                } catch (error: any) {
                    if (error.response?.status === 404) {
                        setSelectedUserPermissions([]);
                    } else {
                        toast({
                            title: "Erro",
                            description: "Erro ao buscar permissões do usuário.",
                            variant: "destructive",
                        });
                    }
                }
            }
            fetchUserPermissions();
        }
    }, [selectedUserId, form.setValue, toast]);

    // Envio do formulário de permissões
    const onSubmit = async (values: PermissionsFormValues) => {
        try {
            const response = await api.post(`/users/${values.userId}/permissions`, {
                permissions: values.permissionIds,
            });
            toast({
                title: "Sucesso",
                description: response.data.message || "Permissões atualizadas com sucesso.",
                variant: "success",
            });
        } catch (error: any) {
            toast({
                title: "Erro",
                description: "Ocorreu um erro ao atualizar as permissões.",
                variant: "destructive",
            });
        }
    };

    // Funções para editar e excluir o usuário selecionado
    const handleEdit = () => {
        const user = users.find((u) => u.id === selectedUserId);
        if (user) {
            setUserToEdit(user);
            setEditDialogOpen(true);
        }
    };

    const handleDelete = async () => {
        if (selectedUserId && confirm("Tem certeza que deseja excluir este usuário?")) {
            try {
                await api.delete(`/users/${selectedUserId}`);
                toast({
                    title: "Sucesso",
                    description: "Usuário excluído com sucesso.",
                    variant: "success",
                });
                setUsers((prev) => prev.filter((u) => u.id !== selectedUserId));
                form.setValue("userId", "");
                form.setValue("permissionIds", []);
            } catch (error: any) {
                toast({
                    title: "Erro",
                    description: "Erro ao excluir o usuário.",
                    variant: "destructive",
                });
            }
        }
    };

    // Opções para o SelectForm de usuários
    const userOptions = users.map((user) => ({
        label: `${user.name} (${user.email})`,
        value: user.id,
    }));

    return (
        <>
            <div className="mb-4">
                <h2 className="text-sm text-neutral-500 font-medium">Atribuir Permissões aos Usuários</h2>
                <CustomForm form={form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Seleciona o usuário */}
                        <SelectForm
                            label="Usuário"
                            placeholder="Selecione um usuário"
                            name="userId"
                            control={form.control}
                            options={userOptions}
                            description="Selecione o usuário ao qual deseja atribuir permissões."
                        />

                        {/* Botões para editar e excluir o usuário, se selecionado */}
                        {selectedUserId && (
                            <div className="flex space-x-4">
                                <Button variant="outline" onClick={handleEdit}>Editar Usuário</Button>
                                <Button variant="destructive" onClick={handleDelete}>Excluir Usuário</Button>
                            </div>
                        )}

                        {/* Lista de permissões com checkbox */}
                        <div>
                            <h2 className="text-lg font-medium mb-2">Permissões do Sistema</h2>
                            <div className="grid grid-cols-1 gap-2">
                                {permissions.map((perm) => (
                                    <div key={perm.id} className="flex items-center space-x-2">
                                        <Controller
                                            control={form.control}
                                            name="permissionIds"
                                            render={({ field: { value, onChange } }) => {
                                                const checked = value.includes(perm.id);
                                                return (
                                                    <>
                                                        <Checkbox
                                                            checked={checked}
                                                            onCheckedChange={(checkedValue) => {
                                                                if (checkedValue) {
                                                                    onChange([...value, perm.id]);
                                                                } else {
                                                                    onChange(value.filter((id: string) => id !== perm.id));
                                                                }
                                                            }}
                                                        />
                                                        <Label className="cursor-pointer">
                                                            {perm.name} <span className="text-xs text-gray-500">({perm.description})</span>
                                                        </Label>
                                                    </>
                                                );
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-end space-x-4">
                            <Button type="submit">Atualizar Permissões</Button>
                            <Button variant="outline" asChild>
                                <Link href="/settings">Cancelar</Link>
                            </Button>
                        </div>
                    </form>
                </CustomForm>
            </div>

            {/* Dialog para Edição */}
            {userToEdit && (
                <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                    <DialogTrigger asChild>
                        {/* Trigger invisível, pois o diálogo é aberto programaticamente */}
                        <span />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl" onPointerDownOutside={(event) => event.preventDefault()}>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-teal-400 font-normal text-sm tracking-widest">
                                Editar Usuário
                            </DialogTitle>
                            <DialogDescription>
                                Faça as alterações necessárias.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4">
                            <EditUserForm
                                initialData={userToEdit}
                                onClose={() => setEditDialogOpen(false)}
                                onUserUpdated={(updatedUser) => {
                                    // Atualiza o usuário na lista
                                    setUsers((prev) =>
                                        prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
                                    );
                                }}
                            />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Fechar</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}