"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import ActivityForm from "./activity-form";

export function ActivityFormDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="default">新規登録</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Form</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <ActivityForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
