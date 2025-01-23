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

type InputFormProps = {
    name: string,
    label: string,
    placeholder: string,
    type: string,
    control: any,
    onChange?: any
};

const InputForm = ({ name, label, placeholder, type, control, onChange }: InputFormProps) => (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Input
                        type={type}
                        placeholder={placeholder}
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
);

export default InputForm;