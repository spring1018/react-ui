import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { DynamicForm } from "../DynamicForm";

export default function SheetForm({
  mode,
  buttonVariant = "default",
  formSchema,
  initialValues,
  handleSubmit,
  handleDelete = () => {},
  ...rest
}) {
  const [open, setOpen] = useState(false);

  const formProps = {
    mode,
    formSchema,
    initialValues,
    ...rest,
    handleSubmit: (data) => {
      handleSubmit(data);
      setOpen(false);
    },
    handleDelete,
  };

  return (
    <Sheet open={open}>
      <SheetTrigger onClick={() => setOpen(true)} asChild>
        <Button variant={buttonVariant}>
          {mode === "create" ? "新規登録" : "編集"}
        </Button>
      </SheetTrigger>
      <SheetContent
        onInteractOutside={() => setOpen(false)}
        onCloseClick={() => setOpen(false)}
      >
        <SheetHeader className="py-2">
          <SheetTitle>{mode === "create" ? "新規登録" : "編集"}</SheetTitle>
        </SheetHeader>
        <DynamicForm {...formProps} />
      </SheetContent>
    </Sheet>
  );
}
