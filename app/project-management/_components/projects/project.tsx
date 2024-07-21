"use client";
import { Separator } from "@/components/ui/separator";
import {
  type Department,
  type Project as ProjectType,
  type Task,
} from "../../type";
import { useProject } from "../hooks/use-project";
import { useViewMode } from "../hooks/use-viewmode";
import TaskGantt from "../tasks/task-gantt";
import { ViewSwitcher } from "../tasks/view-switcher";
import ProjectDisplay from "./project-display";
import ProjectList from "./project-list";

interface ProjectProps {
  projects: ProjectType[];
  tasks: Task[];
  departments: Department[];
}

export default function Project({
  projects,
  tasks,
  departments,
}: ProjectProps) {
  const [project] = useProject();
  const [viewMode] = useViewMode();

  return (
    <div className="flex gap-4">
      <div className="grid gap-y-2 min-w-[250px] w-[230px] fixed top-[65px] left-0 h-full bg-white shadow-lg p-4">
        <ProjectList items={projects} departments={departments} />
      </div>
      <div className="flex-1 overflow-hidden ml-[220px] px-4">
        <div>
          <ProjectDisplay
            item={projects.find((item) => item.id === project.selected)}
          />
          <Separator />
          <ViewSwitcher />
          {tasks && tasks.length > 0 ? (
            <TaskGantt
              viewMode={viewMode}
              tasks={tasks
                .sort((a, b) => {
                  if (a.sortKey < b.sortKey) return -1;
                  if (a.sortKey > b.sortKey) return 1;
                  return 0;
                })
                .map((task: { start: string; end: string }) => ({
                  ...(task as object),
                  start: new Date(task.start),
                  end: new Date(task.end),
                }))}
            />
          ) : (
            <p>loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}
