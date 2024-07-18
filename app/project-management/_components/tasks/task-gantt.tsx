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
import { useState } from "react";
import { useSWRConfig } from "swr";
import { createFormSchema, updateFormSchema } from "./formSchema";
import { TaskListHeader } from "./task-list-header";
import { TaskListTable } from "./task-list-table";

type ViewSwitcherProps = {
  isChecked: boolean;
  onViewListChange: (isChecked: boolean) => void;
  onViewModeChange: (viewMode: ViewMode) => void;
};

export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  onViewModeChange,
  onViewListChange,
  isChecked,
}) => {
  return (
    <div className="flex gap-2">
      {/* <Button
        className="Button"
        onClick={() => onViewModeChange(ViewMode.Hour)}
      >
        Hour
      </Button>
      <Button
        className="Button"
        onClick={() => onViewModeChange(ViewMode.QuarterDay)}
      >
        Quarter of Day
      </Button>
      <Button
        className="Button"
        onClick={() => onViewModeChange(ViewMode.HalfDay)}
      >
        Half of Day
      </Button> */}
      <Button
        variant={"outline"}
        onClick={() => onViewModeChange(ViewMode.Day)}
      >
        Day
      </Button>
      <Button
        variant={"outline"}
        onClick={() => onViewModeChange(ViewMode.Week)}
      >
        Week
      </Button>
      <Button
        variant={"outline"}
        onClick={() => onViewModeChange(ViewMode.Month)}
      >
        Month
      </Button>
      <Button
        variant={"outline"}
        onClick={() => onViewModeChange(ViewMode.Year)}
      >
        Year
      </Button>
      <div className="Switch">
        <label className="Switch_Toggle">
          <input
            type="checkbox"
            defaultChecked={isChecked}
            onClick={() => onViewListChange(!isChecked)}
          />
          <span className="Slider" />
        </label>
        Show Task List
      </div>
    </div>
  );
};

export default function TaskGantt({ tasks, onDateChange }) {
  const [view, setView] = useState(ViewMode.Month);
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [updateInitialValues, setUpdateInitialValues] = useState({});
  const [createInitialValues, setCreateInitialValues] = useState({});
  const { mutate } = useSWRConfig();

  let columnWidth = 65;
  if (view === ViewMode.Year) {
    columnWidth = 350;
  } else if (view === ViewMode.Month) {
    columnWidth = 250;
  } else if (view === ViewMode.Week) {
    columnWidth = 200;
  }

  const handleUpdate = (body) => {
    fetch("/api/project-management/tasks", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    mutate("/api/project-management/tasks", async (data) => {
      const newTasks = data.map((t) => {
        if (t.id === body.id) {
          return body;
        }
        return t;
      });
      return { tasks: newTasks };
    });
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
    mutate("/api/project-management/tasks", async (data) => {
      return [...data, body];
    });
    setUpdateFormOpen(false);
  };

  const handleDelete = (body) => {
    fetch(`/api/project-management/tasks/${body.id}`, {
      method: "DELETE",
    });
    mutate("/api/project-management/tasks", async (data) => {
      return data.filter((t) => t.id !== body.id);
    });
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
      <div className="flex justify-between">
        <ViewSwitcher
          onViewModeChange={setView}
          onViewListChange={() => {}}
          isChecked={true}
        />
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
        {/* <SheetForm
          mode="create"
          buttonVariant="default"
          formSchema={createFormSchema}
          initialValues={createInitialValues}
          handleSubmit={(body) => handleCreate(body)}
        /> */}
      </div>
      <div className="overflow-x-auto">
        <Gantt
          tasks={tasks}
          viewDate={new Date(2024, 1, 1)}
          viewMode={view}
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
          onDateChange={onDateChange}
          columnWidth={columnWidth}
        />
      </div>
    </div>
  );
}
