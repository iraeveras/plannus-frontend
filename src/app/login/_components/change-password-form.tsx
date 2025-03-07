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
    const { user } = useAuth();

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

            await api.put("/password/change-password", { newPassword: values.newPassword });
            toast({
                title: "Sucesso",
                description: "Senha alterada com sucesso!",
                variant: "success",
            });
            router.push("/dashboard");
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            </form>
        </CustomForm>
    );
}