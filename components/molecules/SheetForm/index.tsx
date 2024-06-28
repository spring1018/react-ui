import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { DynamicForm } from "../DynamicForm";

export default function SheetForm({ handleSubmit, ...rest }) {
  const [open, setOpen] = useState(false);

  const formProps = {
    ...rest,
    handleSubmit: (data) => {
      handleSubmit(data);
      setOpen(false);
    },
  };

  return (
    <Sheet open={open}>
      <SheetTrigger onClick={() => setOpen(true)}>フォームを開く</SheetTrigger>
      <SheetContent
        onInteractOutside={() => setOpen(false)}
        onCloseClick={() => setOpen(false)}
      >
        <SheetHeader>
          <SheetTitle>フォーム</SheetTitle>
        </SheetHeader>
        <DynamicForm {...formProps} />
      </SheetContent>
    </Sheet>
  );
}
