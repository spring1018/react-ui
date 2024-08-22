import { GanttChart } from "./gantt";
import { initTasks } from "./helper";

export default async function GanttPage() {
  return <GanttChart initTasks={initTasks()} />;
}
