"use client";
import SheetForm from "@/components/molecules/SheetForm";
import { KanbanBoard } from "@/components/organisms/KanbanBoard";
import { useState } from "react";
import { updateFormSchema } from "./formSchema";

const defaultCols = [
  {
    id: "todo" as const,
    title: "Todo",
  },
  {
    id: "in-progress" as const,
    title: "In progress",
  },
  {
    id: "done" as const,
    title: "Done",
  },
];

export default function TaskBoard({ items }) {
  const [form, setForm] = useState(false);

  return (
    <div>
      <SheetForm
        mode="update"
        formSchema={updateFormSchema}
        initialValues={{}}
        handleSubmit={() => {}}
        open={form}
        onOpenChange={(open) => setForm(open)}
        controlled={true}
      />
      <KanbanBoard
        defaultCols={defaultCols}
        items={items}
        onTitleClick={() => setForm(true)}
      />
    </div>
  );
}
