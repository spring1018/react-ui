"use client";
import { DynamicForm } from "@/components/molecules/DynamicForm";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSWRConfig } from "swr";
import type { Task } from "../../type";
import { createFormSchema, updateFormSchema } from "./formSchema";
import { TaskListHeader } from "./task-list-header";
import { TaskListTable } from "./task-list-table";

interface TaskGanttProps {
  viewMode: { selected: ViewMode };
  tasks: Task[];
}

export default function TaskGantt({ viewMode, tasks }: TaskGanttProps) {
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [updateInitialValues, setUpdateInitialValues] = useState({});
  const [createInitialValues, setCreateInitialValues] = useState({});
  const { mutate } = useSWRConfig();
  const router = useRouter();

  const handleTaskChange = async (body) => {
    await fetch("/api/project-management/tasks", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    mutate(tasks.map((t) => (t.id === body.id ? body : t)));
  };

  const getColumnWidth = (viewMode: ViewMode) => {
    let columnWidth = 65;
    if (viewMode === ViewMode.Year) {
      columnWidth = 350;
    } else if (viewMode === ViewMode.Month) {
      columnWidth = 250;
    } else if (viewMode === ViewMode.Week) {
      columnWidth = 200;
    }
    return columnWidth;
  };

  const handleUpdate = (body) => {
    fetch("/api/project-management/tasks", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    // mutate("/api/project-management/tasks", async (data) => {
    //   const newTasks = data.map((t) => {
    //     if (t.id === body.id) {
    //       return body;
    //     }
    //     return t;
    //   });
    //   return { tasks: newTasks };
    // });
    router.refresh();
    setUpdateFormOpen(false);
  };

  const handleCreate = (body) => {
    fetch("/api/project-management/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    // mutate("/api/project-management/tasks", async (data) => {
    //   return [...data, body];
    // });
    // setUpdateFormOpen(false);
    router.refresh();
    setCreateFormOpen(false);
  };

  const handleDelete = (body) => {
    fetch(`/api/project-management/tasks/${body.id}`, {
      method: "DELETE",
    });
    // mutate("/api/project-management/tasks", async (data) => {
    //   return data.filter((t) => t.id !== body.id);
    // });
    // setUpdateFormOpen(false);
    router.refresh();
    setUpdateFormOpen(false);
  };

  return (
    <div className="py-2 grid gap-y-2">
      {/* Update */}
      <Sheet open={updateFormOpen}>
        <SheetContent
          onInteractOutside={() => setUpdateFormOpen(false)}
          onCloseClick={() => setUpdateFormOpen(false)}
        >
          <SheetHeader className="py-2">
            <SheetTitle>編集</SheetTitle>
          </SheetHeader>
          <DynamicForm
            mode="update"
            formSchema={updateFormSchema}
            initialValues={updateInitialValues}
            handleSubmit={(body) => handleUpdate(body)}
            handleDelete={(body) => handleDelete(body)}
          />
        </SheetContent>
      </Sheet>
      {/* Create */}
      <Sheet open={createFormOpen}>
        <SheetContent
          onInteractOutside={() => setCreateFormOpen(false)}
          onCloseClick={() => setCreateFormOpen(false)}
        >
          <SheetHeader className="py-2">
            <SheetTitle>新規作成</SheetTitle>
          </SheetHeader>
          <DynamicForm
            mode="create"
            formSchema={createFormSchema}
            initialValues={createInitialValues}
            handleSubmit={(body) => handleCreate(body)}
          />
        </SheetContent>
      </Sheet>
      <div className="flex justify-start">
        {/* Create */}
        <Button
          onClick={() => {
            setCreateInitialValues({
              type: "task",
              level: 1,
              start: new Date(),
              end: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
              progress: 0,
              projectId: "1",
            });
            setCreateFormOpen(true);
          }}
        >
          新規作成
        </Button>
        <Button onClick={() => router.refresh()} className="ml-2">
          更新
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Gantt
          tasks={tasks}
          viewDate={new Date(2024, 1, 1)}
          viewMode={viewMode.selected}
          TaskListHeader={TaskListHeader}
          TaskListTable={(props) =>
            TaskListTable({
              ...props,
              setUpdateFormOpen,
              setCreateFormOpen,
              setUpdateInitialValues,
              setCreateInitialValues,
            })
          }
          onDateChange={handleTaskChange}
          columnWidth={getColumnWidth(viewMode.selected)}
        />
      </div>
    </div>
  );
}
