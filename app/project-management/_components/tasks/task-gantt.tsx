import { Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { TaskListHeader } from "./task-list-header";
import { TaskListTable } from "./task-list-table";

export default function TaskGantt({ tasks }) {
  return (
    <Gantt
      tasks={tasks}
      viewDate={new Date(2024, 1, 1)}
      viewMode={ViewMode.Day}
      TaskListHeader={TaskListHeader}
      TaskListTable={TaskListTable}
    />
  );
}
