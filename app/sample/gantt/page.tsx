import { GanttChart } from "./gantt";
import { initTasks } from "./helper";

export default async function GanttPage() {
  return (
    <div className="p-2">
      <GanttChart initTasks={initTasks()} viewDate={new Date("2024-07-01")} />
    </div>
  );
}
