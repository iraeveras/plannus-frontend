// File: src/components/forms/select-form.tsx
import React from "react";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/forms/custom-ui-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export interface Option {
    label: string;
    value: string;
}

interface SelectFormProps {
    label: string;
    placeholder?: string;
    description?: string;
    name: string;
    control: any;
    options: Option[];
    onChange?: (value: string) => void;
}

const SelectForm: React.FC<SelectFormProps> = ({
    label,
    placeholder,
    description,
    name,
    control,
    options,
    onChange,
}) => {
    return (
        <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem>
            <FormLabel>{label}</FormLabel>
            <Select
                // Utiliza o valor controlado do react-hook-form
                value={field.value}
                onValueChange={(value) => {
                field.onChange(value);
                onChange && onChange(value);
                }}
            >
                <FormControl>
                <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                </FormControl>
                <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                    {option.label}
                    </SelectItem>
                ))}
                </SelectContent>
            </Select>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
            </FormItem>
        )}
        />
    );
};

export default SelectForm;