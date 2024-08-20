"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
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
  projectOptions,
}: ProjectProps) {
  const [project] = useProject();
  const [viewMode] = useViewMode();

  const filteredTasks = tasks
    .filter((task) => task.projectId === project.selected)
    .sort((a, b) => {
      if (a.sortKey < b.sortKey) return -1;
      if (a.sortKey > b.sortKey) return 1;
      return 0;
    })
    .map((task: { start: string; end: string }) => ({
      ...(task as object),
      start: new Date(task.start),
      end: new Date(task.end),
    }));

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        defaultSize={10}
        minSize={10}
        className="bg-slate-100 p-2"
      >
        <ProjectList items={projects} departments={departments} />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={25} className="p-2">
        <ProjectDisplay
          item={projects.find((item) => item.id === project.selected)}
        />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={65} className="p-2 space-y-2">
        <h2>タスク</h2>
        <ViewSwitcher />
        <TaskGantt
          viewMode={viewMode}
          projects={projects}
          tasks={filteredTasks}
          projectOptions={projectOptions}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
