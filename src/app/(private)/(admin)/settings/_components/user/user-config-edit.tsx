// File: src/app/(private)/(admin)/settings/_components/user/user-config-edit.tsx
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
import { useEffect, useState } from "react";
import AvatarUpload from "@/components/forms/avatar-upload";

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
    role: z.string().min(1, "O papel é obrigatório."),
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

export default function EditUserForm({ initialData, onClose, onUserUpdated }: EditUserFormProps) {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [roleOptions, setRoleOptions] = useState<{ label: string; value: string}[]>([]);

    useEffect(() => {
        async function fetchRoles() {
            try {
                const response = await api.get("/roles");
                const roles = response.data.map((role: any) => ({
                    label: role.name,
                    value: role.id,
                }));
                
                setRoleOptions(roles);
            } catch (error) {
                console.error("Erro ao buscar roles:", error);                
            }
        }
        fetchRoles();
    }, []);    

    const form = useForm<EditUserFormValues>({
        resolver: zodResolver(editUserSchema),
        defaultValues: {
            name: initialData.name || "",
            username: initialData.username || "",
            email: initialData.email || "",
            password: "", // Nunca preenche a senha para edição
            status: initialData.status || "active",
            role: initialData.role || "",
            avatarURL: initialData.avatarURL || "",
        },
        mode: "onChange",
    });

    // Atualiza o campo "role" quando os roles são carregados ou o initialData mudar
    useEffect(() => {
        let roleValue = initialData.role;
        if (roleOptions.length > 0 && roleValue.length !== 24) {
        const found = roleOptions.find((option: { label: string; value: string }) =>
            option.label.toLowerCase() === roleValue.toLowerCase()
        );
        if (found) {
            roleValue = found.value;
        }
        }
        form.setValue("role", roleValue);
    }, [initialData, roleOptions, form]);

    // Atualiza o formulário se o initialData mudar
    useEffect(() => {
        form.reset({
            name: initialData.name || "",
            username: initialData.username || "",
            email: initialData.email || "",
            password: "",
            status: initialData.status || "active",
            role: initialData.role || "",
            avatarURL: initialData.avatarURL || "",
        });
    }, [initialData, form]);

    const onSubmit = async (values: EditUserFormValues) => {
        setIsSubmitting(true);
        try {
            // Se a senha estiver vazia, não a envia para o backend
            const payload = { ...values };
            if (!payload.password) {
                delete payload.password;
            }

            // Se o usuário selecionou um novo avatar, faça o upload
            if (avatarFile) {
                const formData = new FormData();
                formData.append("file", avatarFile);

                const uploadResponse = await api.post("/upload-avatar", formData, {
                    headers: {"Content-Type": "multipart/form-data"},
                });                

                if (uploadResponse.data && uploadResponse.data.url) {
                    payload.avatarURL = uploadResponse.data.url;
                } else {
                    throw new Error("Falha no upload: propriedade 'url' não retornada.");
                }
            }

            // console.log(payload.avatarURL);
            
            const response = await api.put(`/users/${initialData.id}`, payload);
            toast({
                title: "Sucesso!",
                description: "Usuário atualizado com sucesso!",
                variant: "success",
            });

            const updatedUser = response.data.user ? response.data.user : response.data;
            
            onUserUpdated(updatedUser);
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 px-1 flex flex-col">
                <div className="flex items-end p-1 gap-3 w-full">
                    {/* AvatarUpload exibe a imagem atual via initialPreview; se o usuário escolher um novo, o preview muda */}
                    <AvatarUpload
                        onFileSelect={setAvatarFile}
                        initialPreview={initialData.avatarURL}
                    />
                    <div className="w-full">
                        <InputForm
                            label="Nome"
                            placeholder="Digite o nome do usuário"
                            type="text"
                            name="name"
                            control={form.control}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2 w-full">
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
                </div>
                

                {/* Para senha, se for alterar, digitar; caso contrário, deixar vazio */}
                <InputForm
                    label="Senha (opcional)"
                    placeholder="Digite a nova senha (ou deixe em branco)"
                    type="password"
                    name="password"
                    control={form.control}
                />

                <div className="grid grid-cols-2 gap-2 w-full">
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
                </div>
                
                <div className="flex items-center justify-end space-x-4">
                    <Button variant="zinc" type="submit" disabled={!form.formState.isValid || isSubmitting}>
                        {isSubmitting ? "Salvando..." : "Salvar Alterações"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
