"use client";
import { Button } from "@/components/ui/button";
import { Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { useState } from "react";
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
        TaskListTable={TaskListTable}
        onDateChange={onDateChange}
        columnWidth={columnWidth}
      />
    </div>
  );
}
