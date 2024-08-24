"use client";
import { Gantt, Task, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import React, { useEffect } from "react";
import { getStartEndDateForProject } from "./helper";
import { TaskListHeaderDefault } from "./task-list/task-list-header";
import { TaskListTableDefault } from "./task-list/task-list-table";
import { ViewSwitcher } from "./view-switcher";

interface GanttChartProps {
  initTasks: Task[];
  viewDate?: Date;
  viewMode?: "Day" | "Week" | "Month" | "Year";
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
  handleDateChange = () => {},
  TaskListTable = TaskListTableDefault as React.FC,
  TaskListHeader = TaskListHeaderDefault as React.FC,
}: GanttChartProps) => {
  const [view, setView] = React.useState<ViewMode>(viewModes[viewMode]);
  const [tasks, setTasks] = React.useState<Task[]>(initTasks);
  const [isChecked, setIsChecked] = React.useState(true);

  // initTasksが更新されたときにtasksを更新する
  useEffect(() => {
    setTasks(initTasks);
  }, [initTasks]);

  let columnWidth = 65;
  if (view === ViewMode.Year) {
    columnWidth = 350;
  } else if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }

  const handleTaskChange = (task: Task) => {
    let newTasks = tasks.map((t) => (t.id === task.id ? task : t));
    handleDateChange(task);
    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const project =
        newTasks[newTasks.findIndex((t) => t.id === task.project)];
      if (
        project.start.getTime() !== start.getTime() ||
        project.end.getTime() !== end.getTime()
      ) {
        const changedProject = { ...project, start, end };
        newTasks = newTasks.map((t) =>
          t.id === task.project ? changedProject : t,
        );
      }
    }
    setTasks(newTasks);
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
        isChecked={isChecked}
      />
      <Gantt
        tasks={tasks}
        viewMode={view}
        viewDate={viewDate}
        onDateChange={handleTaskChange}
        onProgressChange={handleProgressChange}
        listCellWidth={isChecked ? "155px" : ""}
        columnWidth={columnWidth}
        TaskListTable={TaskListTable}
        TaskListHeader={TaskListHeader}
      />
    </div>
  );
};
