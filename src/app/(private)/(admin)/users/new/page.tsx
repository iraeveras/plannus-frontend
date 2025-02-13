// File: src/app/(private)/(admin)/users/new/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api"; // instância do Axios com interceptor configurado
import InputForm from "@/components/forms/input-form";
import SelectForm from "@/components/forms/select-form";
import HeaderPage from "@/components/private/header-page";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Form } from "@/components/ui/form";
import { useState } from "react";

// Schema de validação para o cadastro de usuário
const userSchema = z.object({
    name: z.string().min(1, "O nome é obrigatório"),
    username: z
        .string()
        .min(1, "O username é obrigatório")
        .regex(/^[a-zA-Z0-9]+$/, "Somente caracteres alfanuméricos são permitidos"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    status: z.enum(["active", "inactive"]),
    role: z.enum(["admin", "managerGeafi", "managerGerop", "managerGemkt", "supervisor", "user"]),
});

type UserFormValues = z.infer<typeof userSchema>;

// Opções para os campos customizados
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

export default function NewUser() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const form = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
            status: "active",
            role: "user", // valor padrão; o admin poderá selecionar o papel desejado
        },
        mode: "onChange",
    });

    const onSubmit = async (values: UserFormValues) => {
        setIsSubmitting(true);

        try {
            // Chamada para o endpoint de criação de usuário
            await api.post("/users", values);
            
            toast({
                title: "Sucesso!",
                description: "Usuário cadastrado com sucesso!",
                variant: "success",
            });
            router.push("/users"); // redireciona para a listagem de usuários
        } catch (error: any) {
            console.error("Erro ao cadastrar usuário:", error.response?.data || error.message);
            toast({
                title: "Erro",
                description: "Ocorreu um erro ao cadastrar o usuário.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <HeaderPage
                breadcrumbItems={[{ label: "Usuários", href: "/users" }]}
                currentPage="Cadastro de Usuário"
            />
            <div className="p-6">
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
                            label="Username"
                            placeholder="Digite o username"
                            type="text"
                            name="username"
                            control={form.control}
                        />
                        <InputForm
                            label="Email"
                            placeholder="Digite o email"
                            type="email"
                            name="email"
                            control={form.control}
                        />
                        <InputForm
                            label="Senha"
                            placeholder="Digite a senha"
                            type="password"
                            name="password"
                            control={form.control}
                        />

                        {/* Campo Status com o componente SelectForm */}
                        <SelectForm
                            label="Status"
                            placeholder="Selecione o status"
                            name="status"
                            control={form.control}
                            options={statusOptions}
                            description="Selecione se o usuário estará ativo ou inativo."
                        />

                        {/* Campo Papel (Role) com o componente SelectForm */}
                        <SelectForm
                            label="Papel"
                            placeholder="Selecione o papel"
                            name="role"
                            control={form.control}
                            options={roleOptions}
                            description="Selecione o papel do usuário (apenas admin pode cadastrar)."
                        />

                        <div className="flex items-center space-x-4">
                            <Button type="submit" disabled={!form.formState.isValid}>
                                {isSubmitting ? "Salvando cadastro..." : "Cadastrar"}
                            </Button>
                            <Button asChild variant="secondary">
                                <Link href="/users">Cancelar</Link>
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    );
}