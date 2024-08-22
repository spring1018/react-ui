"use client";
import { GanttChart } from "@/components/organisms/GanttChart";
import { initTasks } from "./initTasks";
import { TaskListHeaderDefault } from "./task-list/task-list-header";
import { TaskListTableDefault } from "./task-list/task-list-table";

export function Gantt() {
  return (
    <div className="p-2">
      <GanttChart
        initTasks={initTasks()}
        viewDate={new Date("2024-07-01")}
        viewMode="Week"
        TaskListTable={TaskListTableDefault}
        TaskListHeader={TaskListHeaderDefault}
      />
    </div>
  );
}
