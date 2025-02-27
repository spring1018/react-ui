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
    try {
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
    } catch (error) {
      console.error("Failed to update task:", error);
      router.refresh();
    }
  };

  return (
    <div className="p-2 space-y-2">
      <div className="flex gap-2">
        <Button onClick={handleClick}>親タスクの登録</Button>
        <Button onClick={() => router.refresh()}>表示順序の更新</Button>
      </div>
      <GanttChart
        initTasks={tasks}
        viewDate={new Date("2024-07-01")}
        viewMode="Week"
        ganttHeight={750}
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
