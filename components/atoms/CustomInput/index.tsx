"use client";
import { Input as ShadcnInput } from "@/components/ui/input";
import { ChangeEvent, ComponentProps, useState } from "react";

type ShadcnInputProps = ComponentProps<typeof ShadcnInput>;
type Props = ShadcnInputProps & {
  onBlurAction?: (value: string) => void;
  initialValue?: string;
};

export const Input = (props: Props) => {
  const initialValue = props.initialValue ?? "";
  const [previousValue, setPreviousValue] = useState(initialValue);
  const [value, setValue] = useState(initialValue);

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value !== previousValue) {
      setPreviousValue(value);
      props.onBlurAction?.(value);
    }
  };

  return (
    <ShadcnInput
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
    />
  );
};
