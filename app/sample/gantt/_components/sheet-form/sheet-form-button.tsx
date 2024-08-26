"use client";
import CustomForm from "./form";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface SheetFormProps {
  open: boolean;
  handleOpenChange: (open: boolean) => void;
  handleSubmit: () => void;
  tasks: any[];
  defaultValues?: any;
}

export function SheetForm({
  open,
  handleOpenChange,
  handleSubmit,
  tasks,
  defaultValues = {},
}: SheetFormProps) {
  return (
    <div hidden={true}>
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent className="min-w-[500px]">
          <SheetHeader>
            <SheetTitle>フォーム</SheetTitle>
            <SheetDescription />
          </SheetHeader>
          <CustomForm
            tasks={tasks}
            defaultValues={defaultValues}
            handleSubmit={handleSubmit}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
