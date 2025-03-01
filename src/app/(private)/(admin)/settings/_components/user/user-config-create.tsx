// File: src/app/(private)/(admin)/settings/_components/user/user-config-create.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api"; // instância do Axios com interceptor configurado
import InputForm from "@/components/forms/input-form";
import SelectForm from "@/components/forms/select-form";
import AvatarUpload from "@/components/forms/avatar-upload";
import { Button } from "@/components/ui/button";
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
    avatarURL: z.string().optional(), // campo opcional para o avatar
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
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const form = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
            status: "active",
            role: "user", // valor padrão; o admin poderá selecionar o papel desejado
            avatarURL: "", // campo opcional, inicialmente vazio
        },
        mode: "onChange",
    });

    const onSubmit = async (values: UserFormValues) => {
        setIsSubmitting(true);

        try {
            // Prepare o payload sem o avatar (se houver arquivo, o campo ficará vazio)
            let payload = { ...values };
            if (avatarFile) {
                payload.avatarURL = "";
            }

            // Cria o usuário
            const createResponse = await api.post("/users", payload);

            // Tenta extrair o usuário criado (pode estar em createResponse.data.user ou diretamente em createResponse.data)
            let createdUser = createResponse.data.user ? createResponse.data.user : createResponse.data;

            if (!createdUser || !createdUser.id) {
                throw new Error("Usuário não retornado corretamente pelo backend.")
            }

            // Se houver arquivo de avatar, faça o upload e atualize o usuário
            if (avatarFile) {
                const formData = new FormData();
                formData.append("file", avatarFile);

                const uploadResponse = await api.post("/upload-avatar", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                if (uploadResponse.data && uploadResponse.data.url) {
                    const newAvatarURL = uploadResponse.data.url;
                    // Atualiza o usuário com a URL do avatar
                    const updateResponse = await api.put(`/users/${createdUser.id}`, { avatarURL: newAvatarURL });

                    // Atualiza o objeto criado com os dados retornados pela atualização
                    createdUser = updateResponse.data.user ? updateResponse.data.user : updateResponse.data;
                } else {
                    throw new Error("Falha no upload: propriedade 'url' não retornada.");
                }
            }

            toast({
                title: "Sucesso!",
                description: "Usuário cadastrado com sucesso!",
                variant: "success",
            });
            router.push("/settings"); // redireciona para a listagem de usuários
        } catch (error: any) {
            // Extrai mensagens de erro caso haja validação (ex: express-validator)
            const errorData = error.response?.data;
            const errorMessage =
                errorData && errorData.errors
                    ? errorData.errors.map((err: any) => err.msg).join(", ")
                    : errorData?.error || error.message;

            console.error("Erro ao cadastrar usuário:", errorMessage);
            toast({
                title: "Erro",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 px-1 flex flex-col">
                    <div className="flex items-end p-1 gap-3 w-full">
                        {/* Campo opcional para Avatar URL */}
                        <AvatarUpload onFileSelect={setAvatarFile} />
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
                    <InputForm
                        label="Senha"
                        placeholder="Digite a senha"
                        type="password"
                        name="password"
                        control={form.control}
                    />
                    <div className="flex justify-between">
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
                    </div>
                    <div className="flex items-center justify-end space-x-4">
                        <Button variant="zinc" type="submit" disabled={!form.formState.isValid}>
                            {isSubmitting ? "Salvando cadastro..." : "Cadastrar"}
                        </Button>
                        {/* <Button asChild variant="border">
                                <Link href="/settings">Cancelar</Link>
                            </Button> */}
                    </div>
                </form>
            </Form>

        </>
    );
}