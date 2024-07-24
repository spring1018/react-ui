"use client";
import SF from "@/components/molecules/SheetForm";
import { useState } from "react";
import { createFormSchema } from "./formSchema";

// Button を表示せず、任意の要素で Sheet の開閉を制御する例
export default function ControlledSheetForm() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <SF
        mode="create"
        formSchema={createFormSchema}
        initialValues={{}}
        handleSubmit={() => {}}
        open={open}
        onOpenChange={setOpen}
        controlled={true}
      />
      <div onClick={() => setOpen(!open)} className="cursor-pointer">
        {open ? "Close" : "Open"}
      </div>
    </div>
  );
}
