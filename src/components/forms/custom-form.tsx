// File: src/components/form/custom-form.tsx
"use client";

import * as React from "react";
import { FormProvider, UseFormReturn, FieldValues } from "react-hook-form";

interface CustomFormProps<TFieldValues extends FieldValues> {
    form: UseFormReturn<TFieldValues>;
    children: React.ReactNode;
}

export function CustomForm<TFieldValues extends FieldValues>({ form, children }: CustomFormProps<TFieldValues>) {
    return <FormProvider {...form}>{children}</FormProvider>;
}