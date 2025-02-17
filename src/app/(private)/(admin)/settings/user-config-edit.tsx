// File: src/app/(private)/(admin)/settings/user-config-edit.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import InputForm from "@/components/forms/input-form";
import SelectForm from "@/components/forms/select-form";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { Form } from "@/components/ui/form";
import { useState } from "react";

const editUserSchema = z.object({
    name: z.string().min(1, "O nome é obrigatório"),
    username: z
        .string()
        .min(1, "O username é obrigatório")
        .regex(/^[a-zA-Z0-9]+$/, "Somente caracteres alfanuméricos são permitidos"),
    email: z.string().email("Email inválido"),
    // Para edição, senha pode ser opcional (ou deixar vazio se não quiser alterar)
    password: z.string().optional(),
    status: z.enum(["active", "inactive"]),
    role: z.enum(["admin", "managerGeafi", "managerGerop", "managerGemkt", "supervisor", "user"]),
    avatarURL: z.string().optional(),
});

type EditUserFormValues = z.infer<typeof editUserSchema>;

interface EditUserFormProps {
    initialData: EditUserFormValues & { id: string };
    onClose: () => void;
    onUserUpdated: (updatedUser: any) => void;
}

const statusOptions = [
    { label: "Ativo", value: "active" },
    { label: "Inativo", value: "inactive" },
];

const roleOptions = [
    { label: "Admin", value: "admin" },
    { label: "Gerente Administrativo Financeiro", value: "managerGeafi" },
    { label: "Gerente de Operações", value: "managerGerop" },
    { label: "Gerente de Marketing", value: "managerGemkt" },
    { label: "Supervisor", value: "supervisor" },
    { label: "Usuário", value: "user" },
];

export default function EditUserForm({ initialData, onClose, onUserUpdated }: EditUserFormProps) {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Garantindo que os valores iniciais sejam strings (ou o valor padrão desejado)
    const defaultValues: EditUserFormValues = {
        name: initialData.name || "",
        username: initialData.username || "",
        email: initialData.email || "",
        password: "", // Não preenchemos a senha
        status: initialData.status || "active",
        role: initialData.role || "user",
        avatarURL: initialData.avatarURL || "",
    };

    const form = useForm<EditUserFormValues>({
        resolver: zodResolver(editUserSchema),
        defaultValues: {
            name: initialData.name || "",
            username: initialData.username || "",
            email: initialData.email || "",
            password: "", // Nunca preenche a senha para edição
            status: initialData.status || "active",
            role: initialData.role || "user",
            avatarURL: initialData.avatarURL || "",
        },
        mode: "onChange",
    });

    const onSubmit = async (values: EditUserFormValues) => {
        setIsSubmitting(true);
        try {
            // Se a senha estiver vazia, não a envia para o backend
            const payload = { ...values };
            if (!payload.password) {
                delete payload.password;
            }
            const response = await api.put(`/users/${initialData.id}`, payload);
            toast({
                title: "Sucesso!",
                description: "Usuário atualizado com sucesso!",
                variant: "success",
            });
            onUserUpdated(response.data.user);
            onClose();
        } catch (error: any) {
            console.error("Erro ao atualizar usuário:", error.response?.data || error.message);
            toast({
                title: "Erro",
                description: "Ocorreu um erro ao atualizar o usuário.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <InputForm
                    label="Nome"
                    placeholder="Digite o nome do usuário"
                    type="text"
                    name="name"
                    control={form.control}
                />
                <InputForm
                    label="Nome de usuário"
                    placeholder="Digite o username"
                    type="text"
                    name="username"
                    control={form.control}
                />
                <InputForm
                    label="E-mail"
                    placeholder="Digite o email"
                    type="email"
                    name="email"
                    control={form.control}
                />
                {/* Se desejar permitir alteração do avatar via URL */}
                <InputForm
                    label="Avatar URL (opcional)"
                    placeholder="Digite a URL do avatar"
                    type="text"
                    name="avatarURL"
                    control={form.control}
                />
                {/* Para senha, se for alterar, digitar; caso contrário, deixar vazio */}
                <InputForm
                    label="Senha (opcional)"
                    placeholder="Digite a nova senha (ou deixe em branco)"
                    type="password"
                    name="password"
                    control={form.control}
                />
                <SelectForm
                    label="Status"
                    placeholder="Selecione o status"
                    name="status"
                    control={form.control}
                    options={statusOptions}
                    description="Selecione se o usuário estará ativo ou inativo."
                />
                <SelectForm
                    label="Papel"
                    placeholder="Selecione o papel"
                    name="role"
                    control={form.control}
                    options={roleOptions}
                    description="Selecione o papel do usuário."
                />
                <div className="flex items-center justify-end space-x-4">
                    <Button variant="zinc" type="submit" disabled={!form.formState.isValid || isSubmitting}>
                        {isSubmitting ? "Salvando..." : "Salvar Alterações"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
