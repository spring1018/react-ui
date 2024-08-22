"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ControlledSheet, NormalSheet } from "./sheet";

export default function SheetPage() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <NormalSheet />
      <Button onClick={() => setOpen(!open)}>{open ? "Close" : "Open"}</Button>
      <ControlledSheet open={open} handleOpenChange={setOpen} />
    </div>
  );
}
