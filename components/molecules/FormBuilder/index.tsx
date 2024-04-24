import { ColumnDef } from "@/components/organisms/ShadcnuiTable/types";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SheetClose } from "@/components/ui/sheet";
import React, { useState } from "react";
import { DeleteDialogButton } from "../DeleteDialog";

interface FormProps {
  [key: string]: string;
}

interface FormBuilderProps {
  columnDefs: ColumnDef[];
  initialValues?: FormProps;
  openedInSheet?: boolean;
  onSubmit?: (values: FormProps) => void;
  onDelete?: () => void;
}

export const FormBuilder: React.FC<FormBuilderProps> = ({
  columnDefs,
  initialValues = {},
  openedInSheet = false,
  onSubmit = () => {},
  onDelete = () => {},
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
            {!column.componentType && (
              <Label className="col-span-3">
                {formValues[column.accessorKey]}
              </Label>
            )}
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
        <div>
          <div className="flex justify-end">
            <SheetClose>
              <Button type="submit">保存</Button>
            </SheetClose>
          </div>
          <div className="flex justify-end my-6">
            <DeleteDialogButton onDelete={onDelete} />
          </div>
        </div>
      ) : (
        <div className="flex justify-end">
          <Button type="submit">保存</Button>
        </div>
      )}
    </form>
  );
};
