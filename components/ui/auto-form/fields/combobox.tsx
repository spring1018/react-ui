'use client';
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import z from "zod";
import { AutoFormInputComponentProps } from "../types";
import { getBaseSchema } from "../utils";


export function AutoFormComboBox({
  label,
  isRequired,
  field,
  fieldConfigItem,
  zodItem,
}: AutoFormInputComponentProps) {
  const [open, setOpen] = useState(false);

  const baseValues = (getBaseSchema(zodItem) as unknown as z.ZodEnum<any>)._def
    .values;

  let values: [string, string][] = [];
  if (!Array.isArray(baseValues)) {
    values = Object.entries(baseValues);
  } else {
    values = baseValues.map((value) => [value, value]);
  }

  function findItem(value: any) {
    return values.find((item) => item[0] === value);
  }

  return (
    <FormItem>
      <FormLabel>
        {label}
        {isRequired && <span className="text-destructive"> *</span>}
      </FormLabel>
      <FormControl>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="flex w-full justify-between">
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {field.value
                  ? findItem(field.value)?.[1]
                  : "Select an option..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Select an option" />
              <CommandEmpty>No option found.</CommandEmpty>
              <CommandGroup>
                {values.map(([value, label]) => (
                  <CommandItem
                    key={value}
                    onSelect={() => {
                      field.onChange(value);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        field.value === value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </FormControl>
      {fieldConfigItem.description && (
        <FormDescription>{fieldConfigItem.description}</FormDescription>
      )}
      <FormMessage />
    </FormItem>
  );
}
