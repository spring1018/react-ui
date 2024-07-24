"use client";
import SheetForm from "@/components/molecules/SheetForm";
import { KanbanBoard } from "@/components/organisms/KanbanBoard";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardHeader } from "@/components/ui/card";
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

const Card = (task) => (
  <>
    <CardHeader className="px-3 py-3 space-between flex flex-row border-b-2 border-secondary relative">
      {task.title}
      <Badge variant={"outline"} className="ml-auto font-semibold">
        {task.project.title}
      </Badge>
    </CardHeader>
    <CardContent className="px-3 pt-3 pb-6 text-left text-sm whitespace-pre-wrap">
      {task.description}
    </CardContent>
  </>
);

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
        cardContent={Card}
      />
    </div>
  );
}
