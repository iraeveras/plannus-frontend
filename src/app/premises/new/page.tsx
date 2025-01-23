"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { metadata } from "@/app/metadata";
import api from "@/services/api";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/dark-mode";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    name: z.string().min(1, "O nome da premissa é obrigatório"),
    category: z.string().min(1, "A categoria é obrigatória"),
    year: z.number().int().positive("O ano deve ser um número positivo"),
});

const inputStyle = "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary";

export default function NewPremise() {

    useEffect(() => {
        document.title = metadata.premises.title;
        document.querySelector('meta[name="description"]')?.setAttribute("content", metadata.premises.description);
    }, [])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            category: "",
            year: new Date().getFullYear(),
        },
        mode: "onChange", // Valida em tempo real
    })

    const [error, setError] = useState("");
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setError("");
        setIsSubmitting(true);

        try {
            await api.post("/premises", values);
            alert("Premissa cadastrada com sucesso!");
            router.push("/premises");
        } catch (err: any) {
            console.error("Erro ao cadastrar premissa:", err.response?.data || err.message);
            setError(err.response?.data?.error || "Erro ao cadastrar premissa");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <header className="flex items-center justify-between border-b px-4">
                <div className="flex sticky top-0 bg-background  h-16 shrink-0 items-center gap-2 ">
                    <SidebarTrigger className="ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href={"/premises"}>
                                    Premissas
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Cadastro de premissas</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <ModeToggle />
            </header>
            {/* <Title text="Cadastrar Premissa" /> */}
            {error && <p className="text-red-600 mb-4">{error}</p>}

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Premissa</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="DIgite o nome da premissa"
                                        className={inputStyle}
                                        autoComplete="off"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Categoria</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="DIgite a categoria da premissa"
                                        autoComplete="off"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="year"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ano</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Informe o ano da premissa"
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" disabled={!form.formState.isValid}>
                        {isSubmitting ? "Enviando..." : "Cadastrar"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
