import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldValues, UseFormReturn } from "react-hook-form";

type option = {
  value: string;
  label: string;
};

interface FormFieldSelectProps<T extends FieldValues> {
  form: UseFormReturn<any>;
  formFieldName: string;
  formFieldLabel: string;
  options: option[];
  defaultValue?: string;
}

export const FormFieldSelect = ({
  form,
  formFieldName,
  formFieldLabel,
  options,
  defaultValue,
}: FormFieldSelectProps<FieldValues>) => {
  return (
    <FormField
      control={form.control}
      name={formFieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{formFieldLabel}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={defaultValue}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a verified email to display" />
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
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
