"use client";
import { GanttChart } from "@/components/organisms/GanttChart";
import { Button } from "@/components/ui/button";
import { Task } from "gantt-task-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useTask } from "../_hooks/use-task";
import { SheetForm } from "./sheet-form/sheet-form-button";
import { TaskListHeader } from "./task-list/task-list-header";
import { TaskListTable } from "./task-list/task-list-table";

interface GanttProps {
  tasks: Task[];
}

export function Gantt({ tasks }: GanttProps) {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useTask();
  const router = useRouter();

  const handleClick = () => {
    setTask({ selected: "" });
    setOpen(true);
  };

  const handleSubmit = async () => {
    setOpen(false);
    router.refresh();
  };

  const handleDateChange = async (body) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/project-management/tasks/${body.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );
    router.refresh();
  };

  return (
    <div className="p-2 space-y-2">
      <Button onClick={handleClick}>新規登録</Button>
      <GanttChart
        initTasks={tasks}
        viewDate={new Date("2024-07-01")}
        viewMode="Week"
        handleDateChange={handleDateChange}
        // @ts-ignore
        TaskListTable={(props) => TaskListTable({ ...props, setOpen })}
        TaskListHeader={TaskListHeader as React.FC}
      />
      <SheetForm
        open={open}
        handleOpenChange={setOpen}
        handleSubmit={handleSubmit}
        defaultValues={task}
        tasks={tasks}
      />
    </div>
  );
}
