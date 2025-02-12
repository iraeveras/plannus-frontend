// File: src/app/(private)/(admin)/users/new/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api"; // instância do Axios com interceptor configurado
import InputForm from "@/components/forms/input-form";
import HeaderPage from "@/components/private/header-page";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Form } from "@/components/ui/form";

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

export default function NewUser() {
    const router = useRouter();
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
        try {
            // Chamada para o endpoint de criação de usuário
            await api.post("/users", values);
            toast({
                title: "Sucesso!",
                description: "Usuário cadastrado com sucesso!",
                variant: "success",
            });
            router.push("/admin/users"); // redireciona para a listagem de usuários
        } catch (error: any) {
            console.error("Erro ao cadastrar usuário:", error.response?.data || error.message);
            toast({
                title: "Erro",
                description: "Ocorreu um erro ao cadastrar o usuário.",
                variant: "destructive",
            });
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

                        {/* Campo Status */}
                        <div className="flex flex-col">
                            <label className="mb-1">Status</label>
                            <select {...form.register("status")} className="border rounded p-2">
                                <option value="active">Ativo</option>
                                <option value="inactive">Inativo</option>
                            </select>
                            {form.formState.errors.status && (
                                <span className="text-red-600 text-sm">{form.formState.errors.status.message}</span>
                            )}
                        </div>

                        {/* Campo Papel (Role) */}
                        <div className="flex flex-col">
                            <label className="mb-1">Papel</label>
                            <select {...form.register("role")} className="border rounded p-2">
                                <option value="admin">Admin</option>
                                <option value="managerGeafi">Gerente Administrativo Financeiro</option>
                                <option value="managerGerop">Gerente de Operações</option>
                                <option value="managerGemkt">Gerente de Marketing</option>
                                <option value="supervisor">Supervisor</option>
                                <option value="user">Usuário</option>
                            </select>
                            {form.formState.errors.role && (
                                <span className="text-red-600 text-sm">{form.formState.errors.role.message}</span>
                            )}
                        </div>

                        <div className="flex items-center space-x-4">
                            <Button type="submit" disabled={!form.formState.isValid}>
                                Cadastrar
                            </Button>
                            <Button asChild variant="outline">
                                <Link href="/admin/users">Cancelar</Link>
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    );
}