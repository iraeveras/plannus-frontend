// File: src/components/input-form.tsx
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface InputFormProps {
    label: string,
    placeholder?: string,
    type?: string,
    description?: string,
    name: string,
    control: any,
    onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const InputForm: React.FC<InputFormProps> = ({
    label,
    placeholder,
    type = "text",
    description,
    name,
    control,
    onChange,
}) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            {...field}
                            type={type}
                            placeholder={placeholder}
                            onChange={(e) => {
                                field.onChange(e); // Integração com o React Hook Form
                                if (onChange) onChange(e) // Chama a função personalizada se fornecida
                            }}
                        />
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    )
};

export default InputForm;