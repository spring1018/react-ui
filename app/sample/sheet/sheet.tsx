"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function NormalSheet() {
  return (
    <Sheet>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Normal Sheet</SheetTitle>
          <SheetDescription>
            This is a normal sheet. You can close it by clicking outside the
            sheet.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export function ControlledSheet({ open, handleOpenChange }) {
  return (
    <div hidden={true}>
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Controlled Sheet</SheetTitle>
            <SheetDescription>
              This is a controlled sheet. You can open and close it with the
              button above.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
