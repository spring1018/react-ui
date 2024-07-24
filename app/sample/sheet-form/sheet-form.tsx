"use client";
import SF from "@/components/molecules/SheetForm";
import { useState } from "react";
import { createFormSchema } from "./formSchema";

// Button で Sheet の開閉を制御する例
export default function SheetForm() {
  const [open, setOpen] = useState(false);
  return (
    <SF
      mode="create"
      formSchema={createFormSchema}
      initialValues={{}}
      handleSubmit={() => {}}
      controlledOpen={open}
      onOpenChange={setOpen}
    />
  );
}
