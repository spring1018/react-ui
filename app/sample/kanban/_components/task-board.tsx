"use client";
import SheetForm from "@/components/molecules/SheetForm";
import { KanbanBoard } from "@/components/organisms/KanbanBoard";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";
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
  const [initialValues, setInitialValues] = useState({});
  const router = useRouter();

  const handleTitleClick = (body) => {
    setInitialValues(body);
    setForm(true);
  };

  const handleItemMove = async (item) => {
    const task = item.active.data.current.task;
    await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/project-management/tasks`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...task,
          status: task.columnId,
        }),
      },
    );
  };

  const handleFormSubmit = async (values) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/project-management/tasks`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      },
    );
    router.refresh();
  };

  return (
    <div>
      <SheetForm
        mode="update"
        formSchema={updateFormSchema}
        initialValues={{
          ...initialValues,
          start: new Date(initialValues.start),
          end: new Date(initialValues.end),
        }}
        handleSubmit={(e) => handleFormSubmit(e)}
        open={form}
        onOpenChange={(open) => setForm(open)}
        controlled={true}
      />
      <KanbanBoard
        defaultCols={defaultCols}
        items={items}
        onItemMove={handleItemMove}
        onTitleClick={handleTitleClick}
        cardContent={Card}
      />
    </div>
  );
}
