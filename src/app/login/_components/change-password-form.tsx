// File: src/app/login/_componets/change-password-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import InputForm from "@/components/forms/input-form";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { CustomForm } from "@/components/forms/custom-form";
import { useAuth } from "@/context/AuthContext";

// Esquema de validação com confirmação de senha
const changePasswordSchema = z
    .object({
        newPassword: z.string().min(6, "A nova senha deve ter pelo menos 6 caracteres."),
        confirmPassword: z.string().min(6, "Confirme a nova senha."),
    })
    .refine(data => data.newPassword === data.confirmPassword, {
        message: "As senhas não coincidem.",
        path: ["confirmPassword"],
    });

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordForm() {
    const { toast } = useToast();
    const router = useRouter();
    const { user, setUser } = useAuth();

    const form = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (values: ChangePasswordFormValues) => {
        try {
            if (!user || !user.id) {
                throw new Error("Usuário não autenticado.");
            }

            const response = await api.put("/password/change-password", { newPassword: values.newPassword });
            const { token, user: updateUser } = response.data;

            // Atualiza o token e os dados do usuário
            localStorage.setItem("token", token);
            setUser(updateUser);

            toast({
                title: "Sucesso",
                description: "Senha alterada com sucesso!",
                variant: "success",
            });
            router.push("/login");
        } catch (error: any) {
            console.error("Erro ao alterar senha:", error.response?.data || error.message);
            toast({
                title: "Erro",
                description: error.response?.data?.error || error.message,
                variant: "destructive",
            });
        }
    };

    return (
        <CustomForm form={form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Alterar senha</h1>
                    <p className="text-balance text-sm text-slate-500 dark:text-slate-400">
                        Sua conta é de primeiro acesso, obrigatório a alteração de senha
                    </p>
                </div>
                <div className="grid gap-6">
                    <InputForm
                        label="Nova Senha"
                        placeholder="Digite sua nova senha"
                        type="password"
                        name="newPassword"
                        control={form.control}
                    />
                    {form.formState.errors.newPassword && (
                        <p className="text-red-500 text-sm">{form.formState.errors.newPassword.message}</p>
                    )}
                    <InputForm
                        label="Confirmar Nova Senha"
                        placeholder="Confirme sua nova senha"
                        type="password"
                        name="confirmPassword"
                        control={form.control}
                    />
                    {form.formState.errors.confirmPassword && (
                        <p className="text-red-500 text-sm">{form.formState.errors.confirmPassword.message}</p>
                    )}
                    <Button type="submit">Alterar Senha</Button>
                </div>
            </form>
        </CustomForm>
    );
}