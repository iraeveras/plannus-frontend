// File: src/components/forms/custom-form.tsx
"use client";

import * as React from "react";
import { FormProvider, UseFormReturn, FieldValues } from "react-hook-form";
// Importa o Form do seu arquivo customizado:
import { Form } from "./custom-ui-form";

interface CustomFormProps<TFieldValues extends FieldValues> {
    form: UseFormReturn<TFieldValues>;
    children: React.ReactNode;
}

export function CustomForm<TFieldValues extends FieldValues>({ form, children }: CustomFormProps<TFieldValues>) {
    return <Form {...form}>{children}</Form>;
}