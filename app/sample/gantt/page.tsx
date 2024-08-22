import { GanttChart } from "@/components/organisms/GanttChart";
import { initTasks } from "./initTasks";

export default async function GanttPage() {
  return (
    <div className="p-2">
      <GanttChart
        initTasks={initTasks()}
        viewDate={new Date("2024-07-01")}
        viewMode="Week"
      />
    </div>
  );
}
