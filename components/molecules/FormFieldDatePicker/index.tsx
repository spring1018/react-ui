import { DatePicker } from "@/components/ui/date-picker";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues, UseFormReturn } from "react-hook-form";

interface FormFieldDatePickerProps<T extends FieldValues> {
  form: UseFormReturn<any>;
  formFieldName: string;
  formFieldLabel: string;
}

export const FormFieldDatePicker = ({
  form,
  formFieldName,
  formFieldLabel,
}: FormFieldDatePickerProps<FieldValues>) => {
  return (
    <FormField
      control={form.control}
      name={formFieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{formFieldLabel}</FormLabel>
          <FormControl>
            <DatePicker
              {...field}
              date={field.value}
              setDate={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
