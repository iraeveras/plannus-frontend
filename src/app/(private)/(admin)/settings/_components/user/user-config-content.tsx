// File: src/app/(private)/(admin)/settings/_components/user/user-config-content.tsx
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
import { 
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import NewUser from "./user-config-create";
import EditUserForm from "./user-config-edit";

export default function UserConfigContent() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { toast } = useToast();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isNewUserDialogOpen, setIsNewUserDialogOpen] = useState(false);
    const [userToDeleteId, setUserToDeleteId] = useState<string | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    useEffect(() => {
        document.title = metadata.listUsers.title;
        document
            .querySelector('meta[name="description"]')
            ?.setAttribute("content", metadata.listUsers.description);
    }, []);

    
    const fetchUsers = async () => {
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

    useEffect(() => {
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
        } finally {
            setIsDeleteDialogOpen(false);
            setUserToDeleteId(null);
        }
    };

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setIsEditDialogOpen(true);
    };

    const handleUserCreated = (newUser: User) => {
        setUsers((prev) => [...prev, newUser]);
        setIsNewUserDialogOpen(false);
    }

    // Função para atualizar a lista após a edição
    const updateUserInList = (updatedUser: User) => {
        setUsers((prev) =>
            prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
    };

    return (

        <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm text-neutral-500 font-medium">Usuários Cadastrados</h2>
                <Dialog open={isNewUserDialogOpen} onOpenChange={setIsNewUserDialogOpen}>
                    <DialogTrigger asChild>
                        <Button 
                            onClick={() => setIsNewUserDialogOpen(true)} 
                            className="bg-teal-600 hover:bg-teal-500 dark:bg-teal-600 dark:hover:bg-teal-500 dark:text-neutral-100"
                        >
                            <UserRoundPlus /> Novo Usuário
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
                                <UserRoundPlus className="text-teal-600" />
                                Cadastrar Novo Usuário
                            </DialogTitle>

                        </DialogHeader>
                        {/* Aqui você pode incluir o formulário de cadastro de usuário */}
                        <div className="mt-2 overflow-y-auto">
                            {/* Exemplo: você pode reutilizar o formulário de cadastro que já criou */}
                            <NewUser 
                                onClose={() => setIsNewUserDialogOpen(false)} 
                                onUserCreated={handleUserCreated}
                            />
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
                            <FilePenLine 
                                className="cursor-pointer text-teal-400 hover:text-teal-500" 
                                onClick={() => handleEdit(row)} 
                            />
                            {/* AlertDialog para confirmação de exclusão */}
                            <AlertDialog open={isDeleteDialogOpen && userToDeleteId === row.id} onOpenChange={setIsDeleteDialogOpen}>
                                <AlertDialogTrigger asChild>
                                    <Trash2
                                        className="cursor-pointer text-red-400 hover:text-red-500"
                                        onClick={() => setUserToDeleteId(row.id)}
                                    />
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Tem certeza que deseja excluir este usuário?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => userToDeleteId && handleDelete(userToDeleteId)}>
                                            Excluir
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
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
                        <div className="mt-2 overflow-y-auto">
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
