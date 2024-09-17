import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, UseFormReturn } from "react-hook-form";

interface FormFieldInputProps<T extends FieldValues> {
  form: UseFormReturn<any>;
  formFieldName: string;
  formFieldLabel: string;
  disabled?: boolean;
}

export const FormFieldInput = ({
  form,
  formFieldName,
  formFieldLabel,
  disabled = false,
}: FormFieldInputProps<FieldValues>) => {
  return (
    <FormField
      control={form.control}
      name={formFieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{formFieldLabel}</FormLabel>
          <FormControl>
            <Input
              placeholder={formFieldLabel}
              {...field}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
