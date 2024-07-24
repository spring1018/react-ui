import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DynamicForm } from "../DynamicForm";

interface SheetFormProps {
  mode: "create" | "update";
  buttonVariant?: "default" | "primary";
  formSchema: any;
  initialValues: any;
  handleSubmit: (data: any) => void;
  handleDelete?: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  controlled?: boolean;
}

export default function SheetForm({
  mode,
  buttonVariant = "default",
  formSchema,
  initialValues,
  handleSubmit,
  handleDelete = () => {},
  open,
  onOpenChange,
  controlled = false,
  ...rest
}: SheetFormProps) {
  const formProps = {
    mode,
    formSchema,
    initialValues,
    ...rest,
    handleSubmit: (data) => {
      handleSubmit(data);
      onOpenChange(false);
    },
    handleDelete: () => {
      handleDelete();
      onOpenChange(false);
    },
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {controlled ? null : (
        <SheetTrigger onClick={() => onOpenChange(true)} asChild>
          <Button variant={buttonVariant}>
            {mode === "create" ? "新規登録" : "編集"}
          </Button>
        </SheetTrigger>
      )}
      <SheetContent
        onInteractOutside={() => onOpenChange(false)}
        onCloseClick={() => onOpenChange(false)}
      >
        <SheetHeader className="py-2">
          <SheetTitle>{mode === "create" ? "新規登録" : "編集"}</SheetTitle>
        </SheetHeader>
        <DynamicForm {...formProps} />
      </SheetContent>
    </Sheet>
  );
}
