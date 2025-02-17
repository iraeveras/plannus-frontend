// File: src/app/(private)/(admin)/settings/user-config-content.tsx
"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { metadata } from "@/app/metadata";
import { useToast } from "@/hooks/use-toast";
import { FilePenLine, Trash2, UserRoundPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { User } from "@/types/User";
import DataTable from "@/components/data-display/data-table";
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
import NewUser from "./user-config-create";
import EditUserForm from "./user-config-edit";

// interface User {
//     id: string;
//     name: string;
//     username: string;
//     email: string;
//     role: string;
//     status: string;
//     avatarURL?: string;
// }

export default function UserConfigContent() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { toast } = useToast();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    useEffect(() => {
        document.title = metadata.listUsers.title;
        document
            .querySelector('meta[name="description"]')
            ?.setAttribute("content", metadata.listUsers.description);
    }, []);

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
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, [toast]);

    const columns = [
        { key: "name", label: "Nome", sortable: true, filterable: true },
        { key: "username", label: "Nome de usuário", sortable: true, filterable: true },
        { key: "email", label: "E-mail", sortable: true, filterable: true },
        { key: "role", label: "Papel", sortable: true, filterable: true },
        { key: "status", label: "Status", sortable: true, filterable: true },
    ] as const;

    const handleDelete = async (id: string) => {
        if (confirm("Tem certeza que deseja excluir este usuário?")) {
            try {
                await api.delete(`/users/${id}`);
                toast({
                    title: "Sucesso",
                    description: "Usuário excluído com sucesso.",
                    variant: "success",
                });
                setUsers((prev) => prev.filter((user) => user.id !== id));
            } catch (error: any) {
                toast({
                    title: "Erro",
                    description: "Erro ao excluir o usuário.",
                    variant: "destructive",
                });
            }
        }
    };

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setIsEditDialogOpen(true);
    };

    // Função para atualizar a lista após a edição
    const updateUserInList = (updatedUser: User) => {
        setUsers((prev) =>
            prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
    };

    return (
        
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm text-neutral-500 font-medium">Usuários Cadastrados</h2>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-teal-600 hover:bg-teal-500 dark:bg-teal-600 dark:hover:bg-teal-500 dark:text-neutral-100">
                            <UserRoundPlus/> Novo Usuário
                        </Button>
                    </DialogTrigger>
                    <DialogContent 
                        className="sm:max-w-2xl"
                        onPointerDownOutside={(event) => event.preventDefault()}
                    >
                        <DialogHeader>
                            <DialogTitle 
                                className="flex items-center gap-2 text-teal-400 font-normal text-sm tracking-widest"
                            >
                                <UserRoundPlus className="text-teal-600"/> 
                                Cadastrar Novo Usuário
                            </DialogTitle>
                            
                        </DialogHeader>
                        {/* Aqui você pode incluir o formulário de cadastro de usuário */}
                        <div className="mt-4">
                            {/* Exemplo: você pode reutilizar o formulário de cadastro que já criou */}
                            <NewUser/>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {loading ? (
                <p>Carregando usuários...</p>
            ) : users.length === 0 ? (
                <p>Nenhum usuário cadastrado.</p>
            ) : (
                <DataTable<User>
                    data={users}
                    columns={[...columns]}
                    actions={(row) => (
                        <>
                            <FilePenLine className="cursor-pointer text-teal-400 hover:text-teal-500" onClick={() => handleEdit(row)}/>
                            <Trash2 className="cursor-pointer text-red-400 hover:text-red-500" onClick={() => handleDelete(row.id)}/>
                        </>
                    )}
                />
            )}

            {/* Dialog para Edição */}
            {selectedUser && (
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                        {/* Trigger invisível, pois o diálogo é aberto programaticamente */}
                        <span />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl" onPointerDownOutside={(event) => event.preventDefault()}>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-teal-400 font-normal text-sm tracking-widest">
                                <FilePenLine className="text-teal-600" /> 
                                Editar Usuário
                            </DialogTitle>
                            <DialogDescription>
                                Faça as alterações necessárias.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4">
                            <EditUserForm
                                initialData={selectedUser}
                                onClose={() => setIsEditDialogOpen(false)}
                                onUserUpdated={updateUserInList}
                            />
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}
