import { GanttChart } from "./gantt";
import { initTasks } from "./helper";

export default async function GanttPage() {
  return (
    <div className="p-2">
      <GanttChart initTasks={initTasks()} />
    </div>
  );
}
