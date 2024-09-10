"use client";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Option = { value: string; label: string };

interface ComboboxOption {
  options: Option[];
  initialValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export function Combobox({
  options,
  initialValue = "",
  onChange = () => {},
  className = "",
  placeholder = "Select...",
}: ComboboxOption) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(initialValue);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={
            value
              ? cn("w-full justify-between", className)
              : cn("w-full justify-start", "text-slate-500")
          }
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search..." className="h-9" />
          <CommandList>
            <CommandEmpty>Not found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                // https://github.com/shadcn-ui/ui/issues/458#issuecomment-1873134557
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={(currentValue) => {
                    const selected = options.find(
                      (option) => option.label.toLowerCase() === currentValue,
                    )?.value;
                    setValue(selected === value ? "" : selected ?? "");
                    setOpen(false);
                    onChange(selected === value ? "" : selected ?? "");
                  }}
                >
                  {option.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
