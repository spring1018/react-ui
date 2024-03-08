import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SheetClose } from "@/components/ui/sheet";
import React, { useState } from "react";

interface FormProps {
  id: string;
  value: string;
}

interface SelectOption {
  value: string;
  label: string;
}

interface ColumnDef {
  accessorKey: string;
  title: string;
  componentType: "button" | "input" | "select";
  params?: { selectOptions: SelectOption[] };
}

interface FormBuilderProps {
  columnDefs: ColumnDef[];
  initialValues?: FormProps;
  onSubmit?: (values: FormProps) => void;
  openedInSheet?: boolean;
}

export const FormBuilder: React.FC<FormBuilderProps> = ({
  columnDefs,
  initialValues = {},
  openedInSheet = false,
  onSubmit = () => {},
}) => {
  const [formValues, setFormValues] = useState<FormProps>(initialValues);

  const handleInputChange = (key: string, value: string) => {
    setFormValues((prevValues) => ({ ...prevValues, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      {columnDefs.map((column) => (
        <div key={column.accessorKey} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label>{column.title}</Label>
            {!column.componentType && <p>{formValues[column.accessorKey]}</p>}
            {column.componentType === "input" && (
              <Input
                className="col-span-3"
                type="text"
                value={formValues[column.accessorKey] || ""}
                onChange={(e) =>
                  handleInputChange(column.accessorKey, e.target.value)
                }
              />
            )}
            {column.componentType === "select" && (
              <Combobox
                className="justify-between col-span-3"
                options={column.params?.selectOptions ?? []}
                initialValue={formValues[column.accessorKey]}
                onChange={(option) =>
                  handleInputChange(column.accessorKey, option.value)
                }
              />
            )}
          </div>
        </div>
      ))}
      {openedInSheet ? (
        <div className="flex justify-end">
          <SheetClose>
            <Button type="submit">保存</Button>
          </SheetClose>
        </div>
      ) : (
        <div className="flex justify-end">
          <Button type="submit">保存</Button>
        </div>
      )}
    </form>
  );
};
