"use client";
import CustomForm from "./form";

import { Button } from "@/components/ui/button";
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
  hidden?: boolean;
  defaultValues?: any;
}

export function TaskSheetForm({
  open,
  handleOpenChange,
  handleSubmit,
  tasks,
  hidden = true,
  defaultValues = {},
}: SheetFormProps) {
  return (
    <div hidden={hidden}>
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetTrigger asChild>
          <Button>Open</Button>
        </SheetTrigger>
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
