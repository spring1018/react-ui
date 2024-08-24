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
import type { Task } from "../../type";
import { useProject } from "../hooks/use-project";
import { createFormSchema, updateFormSchema } from "./formSchema";
import { TaskListHeader } from "./task-list-header";
import { TaskListTable } from "./task-list-table";

interface TaskGanttProps {
  viewMode: { selected: ViewMode };
  tasks: Task[];
}

export default function TaskGantt({
  viewMode,
  tasks,
  projectOptions,
}: TaskGanttProps) {
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [updateInitialValues, setUpdateInitialValues] = useState({});
  const [createInitialValues, setCreateInitialValues] = useState({});
  const [project] = useProject();
  const router = useRouter();

  const handleTaskChange = async (body) => {
    await fetch("/api/project-management/tasks", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
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

  const handleUpdate = async (body) => {
    await fetch("/api/project-management/tasks", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    setUpdateFormOpen(false);
    router.refresh();
  };

  const handleCreate = async (body) => {
    await fetch("/api/project-management/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    setCreateFormOpen(false);
    router.refresh();
  };

  const handleDelete = async (body) => {
    await fetch(`/api/project-management/tasks/${body.id}`, {
      method: "DELETE",
    });
    setUpdateFormOpen(false);
    router.refresh();
  };

  return (
    <div className="grid py-2 gap-y-2">
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
            formSchema={updateFormSchema({ projects: projectOptions })}
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
            formSchema={createFormSchema({ projects: projectOptions })}
            initialValues={createInitialValues}
            handleSubmit={(body) => handleCreate(body)}
          />
        </SheetContent>
      </Sheet>
      <div className="flex justify-start">
        {/* 親タスクの Create */}
        <Button
          onClick={() => {
            setCreateInitialValues({
              type: "task",
              level: 1,
              status: "todo",
              progress: 0,
              start: new Date(),
              end: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
              description: "",
              projectId: project.selected,
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
      {(tasks.length > 0 && (
        <div className="overflow-x-auto">
          <Gantt
            tasks={tasks}
            viewDate={new Date()}
            viewMode={viewMode.selected}
            TaskListHeader={(props) =>
              TaskListHeader({ ...props, hideColumns: true })
            }
            TaskListTable={(props) =>
              TaskListTable({
                ...props,
                hideColumns: true,
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
      )) || (
        <div className="text-gray-500">
          新規登録からタスクを登録してください
        </div>
      )}
    </div>
  );
}
