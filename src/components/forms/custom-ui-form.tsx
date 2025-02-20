// File: src/components/forms/custom-ui-form.tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
    Controller,
    ControllerProps,
    FieldPath,
    FieldValues,
    FormProvider,
    useFormContext,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

// Utilizamos o FormProvider do react-hook-form
const Form = FormProvider

// Contexto para armazenar o nome do campo do FormField
type FormFieldContextValue<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
    name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
    {} as FormFieldContextValue
)

// Contexto para o FormItem (para gerar um id único)
type FormItemContextValue = {
    id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
    {} as FormItemContextValue
)

// Interface para o estado do campo – garantimos que "error" esteja presente
interface FieldState {
    error?: any
    // Outras propriedades que getFieldState possa retornar podem ser adicionadas se necessário
}

// Nosso hook customizado que utiliza um fallback para getFieldState
const useCustomFormField = () => {
    const fieldContext = React.useContext(FormFieldContext)
    const itemContext = React.useContext(FormItemContext)
    const formContext = useFormContext()

    // Se getFieldState não estiver definido ou não for função, usamos um fallback que retorna um objeto com error definido como undefined
    const getFieldStateFn =
        typeof formContext.getFieldState === "function"
            ? formContext.getFieldState
            : (() => ({ error: undefined } as FieldState))

    const fieldState: FieldState = getFieldStateFn(fieldContext.name, formContext.formState)

    if (!fieldContext) {
        throw new Error("useCustomFormField should be used within <FormField>")
    }

    const { id } = itemContext

    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        error: fieldState.error, // Garantido que error estará definido (pode ser undefined)
        ...fieldState,
    }
}

// Componente que envolve o Controller e disponibiliza o contexto do campo
const FormField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    ...props
}: ControllerProps<TFieldValues, TName>) => {
    return (
        <FormFieldContext.Provider value={{ name: props.name }}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    )
}

// Componente que fornece um container para itens do formulário
const FormItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const id = React.useId()
    return (
        <FormItemContext.Provider value={{ id }}>
            <div ref={ref} className={cn("space-y-2", className)} {...props} />
        </FormItemContext.Provider>
    )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
    React.ElementRef<typeof LabelPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
    const { error, formItemId } = useCustomFormField()

    return (
        <Label
            ref={ref}
            className={cn(error && "text-red-500 dark:text-red-900", className)}
            htmlFor={formItemId}
            {...props}
        />
    )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
    React.ElementRef<typeof Slot>,
    React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useCustomFormField()

    return (
        <Slot
            ref={ref}
            id={formItemId}
            aria-describedby={
                !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`
            }
            aria-invalid={!!error}
            {...props}
        />
    )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
    const { formDescriptionId } = useCustomFormField()

    return (
        <p
            ref={ref}
            id={formDescriptionId}
            className={cn("text-xs text-slate-950 dark:text-gray-600", className)}
            {...props}
        />
    )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useCustomFormField()
    const body = error ? String(error?.message) : children

    if (!body) {
        return null
    }

    return (
        <p
            ref={ref}
            id={formMessageId}
            className={cn("text-sm font-medium text-red-500 dark:text-red-900", className)}
            {...props}
        >
            {body}
        </p>
    )
})
FormMessage.displayName = "FormMessage"

export {
    useCustomFormField as useFormField,
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormField,
}