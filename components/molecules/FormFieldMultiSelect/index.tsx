import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { MultiSelect } from "../MultiSelect";

interface FormFieldMultiSelectProps<T extends FieldValues> {
  form: UseFormReturn<any>;
  formFieldName: string;
  formFieldLabel: string;
  options: { label: string; value: string }[];
  selected: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
}

export const FormFieldMultiSelect = ({
  form,
  formFieldName,
  formFieldLabel,
  options,
  selected,
  onChange,
}: FormFieldMultiSelectProps<FieldValues>) => {
  return (
    <FormField
      control={form.control}
      name={formFieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{formFieldLabel}</FormLabel>
          <FormControl>
            <MultiSelect
              options={options}
              selected={selected}
              onChange={onChange}
              placeholder={formFieldLabel}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
