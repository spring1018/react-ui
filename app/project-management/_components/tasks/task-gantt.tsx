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
import * as z from "zod";
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
  const [open, setOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  const mode = "update";
  const formSchema = z.object({
    name: z
      .string({ required_error: "タスク名は必須です" })
      .describe({ type: "input" }),
    progress: z.number().describe({ type: "input" }),
  });

  let columnWidth = 65;
  if (view === ViewMode.Year) {
    columnWidth = 350;
  } else if (view === ViewMode.Month) {
    columnWidth = 250;
  } else if (view === ViewMode.Week) {
    columnWidth = 200;
  }

  return (
    <div className="py-2 grid gap-y-2">
      <Sheet open={open}>
        <SheetContent
          onInteractOutside={() => setOpen(false)}
          onCloseClick={() => setOpen(false)}
        >
          <SheetHeader className="py-2">
            <SheetTitle>{mode === "create" ? "新規登録" : "編集"}</SheetTitle>
          </SheetHeader>
          <DynamicForm
            mode={mode}
            formSchema={formSchema}
            initialValues={initialValues}
            handleSubmit={() => {}}
            handleDelete={() => {}}
          />
        </SheetContent>
      </Sheet>
      <ViewSwitcher
        onViewModeChange={setView}
        onViewListChange={() => {}}
        isChecked={true}
      />
      <Gantt
        tasks={tasks}
        viewDate={new Date(2024, 1, 1)}
        viewMode={view}
        TaskListHeader={TaskListHeader}
        TaskListTable={(props) =>
          TaskListTable({ ...props, setOpen, setInitialValues })
        }
        onDateChange={onDateChange}
        columnWidth={columnWidth}
      />
    </div>
  );
}
