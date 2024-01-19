"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type Option = {
  value: number | string;
  label: string;
  description?: string;
};

export type ComboboxProps = {
  className?: string;
  options: Option[];
  initialValue?: number | string;
  onChange?: any;
};

export const Combobox = (props: ComboboxProps) => {
  const { className, options, initialValue, onChange } = props;
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(initialValue);

  return (
    // ref: https://github.com/shadcn-ui/ui/issues/542
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={className}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : "項目の選択"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] min-h-[100px] p-0">
        <Command>
          <CommandInput placeholder="項目の検索..." />
          <ScrollArea className="max-w-[300px] min-h-[100px] max-h-[300px] p-0 overflow-y-auto">
            <CommandEmpty>Not found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label + option.description} // ref: https://github.com/shadcn-ui/ui/issues/458
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : option.value);
                    setOpen(false);
                    onChange(option);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="grid">
                    <p>{option.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
