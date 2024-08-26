"use client";
import { Gantt, Task, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import React, { useEffect, useState } from "react";
import { TaskListHeaderDefault } from "./task-list/task-list-header";
import { TaskListTableDefault } from "./task-list/task-list-table";
import { ViewSwitcher } from "./view-switcher";

interface GanttChartProps {
  initTasks: Task[];
  viewDate?: Date;
  viewMode?: "Day" | "Week" | "Month" | "Year";
  ganttHeight?: number;
  handleDateChange?: (body: any) => void;
  TaskListTable?: React.FC;
  TaskListHeader?: React.FC;
}

const viewModes: { [key: string]: ViewMode } = {
  Day: ViewMode.Day,
  Week: ViewMode.Week,
  Month: ViewMode.Month,
  Year: ViewMode.Year,
};

export const GanttChart = ({
  initTasks,
  viewDate = new Date(),
  viewMode = "Month",
  ganttHeight = 500,
  handleDateChange = () => {},
  TaskListTable = TaskListTableDefault as React.FC,
  TaskListHeader = TaskListHeaderDefault as React.FC,
}: GanttChartProps) => {
  const [view, setView] = useState<ViewMode>(viewModes[viewMode]);
  const [tasks, setTasks] = useState<Task[]>(initTasks);
  const [searchText, setSearchText] = useState("");
  const [filterStatuses, setFilterStatuses] = useState<string[]>([
    "todo",
    "in progress",
    "done",
  ]);
  const [isChecked, setIsChecked] = useState(true);
  const [onlyParentTasks, setOnlyParentTasks] = useState(false);

  useEffect(() => {
    setTasks(initTasks);
  }, [initTasks]);

  const filteredTasks = tasks
    .filter((task) => (onlyParentTasks ? !task.parentTaskId : true))
    .filter((task) => (searchText ? task.name.includes(searchText) : true))
    .filter((task) =>
      filterStatuses.length > 0 ? filterStatuses.includes(task.status) : true,
    );

  let columnWidth = 65;
  if (view === ViewMode.Year) {
    columnWidth = 350;
  } else if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }

  const handleTaskChange = (task: Task) => {
    const newTasks = tasks.map((t) => (t.id === task.id ? task : t));
    setTasks(newTasks);
    handleDateChange(task);
  };

  const handleProgressChange = async (task: Task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  };

  return (
    <div className="space-y-2">
      <ViewSwitcher
        viewMode={viewMode}
        onViewModeChange={(viewMode) => setView(viewMode)}
        onViewListChange={setIsChecked}
        setSearchText={setSearchText}
        filterStatuses={filterStatuses}
        setFilterStatuses={setFilterStatuses}
        isChecked={isChecked}
        onlyParentTasks={onlyParentTasks}
        setOnlyParentTasks={setOnlyParentTasks}
      />
      {filteredTasks.length > 0 ? (
        <Gantt
          tasks={filteredTasks}
          viewMode={view}
          viewDate={viewDate}
          onDateChange={handleTaskChange}
          onProgressChange={handleProgressChange}
          listCellWidth={isChecked ? "155px" : ""}
          columnWidth={columnWidth}
          ganttHeight={filteredTasks.length < 12 ? 0 : ganttHeight}
          TaskListTable={TaskListTable}
          TaskListHeader={TaskListHeader}
        />
      ) : (
        <div className="p-4 text-gray-500">No items found</div>
      )}
    </div>
  );
};
