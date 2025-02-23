// File: src/app/(private)/(admin)/settings/role/role-config-list.tsx
"use client";

import React, { useEffect, useState } from "react";
import RoleTable, { Role } from "./role-table";
import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
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
import EditRoleForm from "./role-config-edit";
import { Button } from "@/components/ui/button";

export default function RoleList() {
    const { toast } = useToast();
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    useEffect(() => {
        async function fetchRoles() {
            try {
                const response = await api.get("/roles");
                setRoles(response.data);
            } catch (error: any) {
                toast({
                title: "Erro",
                description: "Erro ao buscar roles.",
                variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        }
        fetchRoles();
    }, [toast]);

    const handleEdit = (role: Role) => {
        setSelectedRole(role);
        setIsEditDialogOpen(true);
    };

    const handleDelete = async (role: Role) => {
        if (confirm("Tem certeza que deseja excluir este role?")) {
        try {
            await api.delete(`/roles/${role.id}`);
            toast({
            title: "Sucesso",
            description: "Role excluído com sucesso.",
            variant: "success",
            });
            setRoles((prev) => prev.filter((r) => r.id !== role.id));
        } catch (error: any) {
            toast({
            title: "Erro",
            description: "Erro ao excluir o role.",
            variant: "destructive",
            });
        }
        }
    };

    // Função para atualizar a lista de roles após a edição
    const updateRoleInList = (updatedRole: Role) => {
        setRoles((prev) =>
        prev.map((role) => (role.id === updatedRole.id ? updatedRole : role))
        );
    };

    if (loading) {
        return <p>Carregando roles...</p>;
    }

    if (roles.length === 0) {
        return <p>Nenhum role cadastrado.</p>;
    }

    return (
        <>
            <RoleTable roles={roles} onEdit={handleEdit} onDelete={handleDelete} />

            {/* Diálogo para edição do Role */}
            {selectedRole && (
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                        {/* Trigger invisível; o diálogo é aberto programaticamente */}
                        <span />
                    </DialogTrigger>
                    <DialogContent
                        className="sm:max-w-2xl"
                        onPointerDownOutside={(event) => event.preventDefault()}
                    >
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-teal-400 font-normal text-sm tracking-widest">
                                Editar Role
                            </DialogTitle>
                            <DialogDescription>
                                Faça as alterações necessárias.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4">
                        <EditRoleForm
                            initialData={selectedRole}
                            onClose={() => setIsEditDialogOpen(false)}
                            onRoleUpdated={(updatedRole) => {
                            updateRoleInList(updatedRole);
                            setIsEditDialogOpen(false);
                            }}
                        />
                        </div>
                        {/* <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Fechar</Button>
                            </DialogClose>
                        </DialogFooter> */}
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}
