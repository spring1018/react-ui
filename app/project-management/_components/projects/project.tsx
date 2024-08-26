"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  type Department,
  type ProjectActivity,
  type Project as ProjectType,
  type Task,
} from "../../type";
import { useProject } from "../hooks/use-project";
import { Gantt } from "../tasks/gantt";
import ProjectDisplay from "./project-display";
import ProjectList from "./project-list";

interface ProjectProps {
  projects: ProjectType[];
  tasks: Task[];
  activities: ProjectActivity[];
  departments: Department[];
  projectOptions: { value: string; label: string }[];
}

export default function Project({
  projects,
  tasks,
  activities,
  departments,
  projectOptions,
}: ProjectProps) {
  const [project] = useProject();

  const filteredTasks = tasks.filter(
    (task) => task.projectId === project.selected,
  );

  const filteredActivities = activities
    .filter((activity) => activity.projectId === project.selected)
    .sort((a, b) => {
      if (a.createdAt < b.createdAt) return -1;
      if (a.createdAt > b.createdAt) return 1;
      return 0;
    });

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        defaultSize={13}
        minSize={13}
        className="bg-slate-800 text-white py-2"
      >
        <ProjectList items={projects} departments={departments} />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={25} className="p-2">
        <ProjectDisplay
          item={projects.find((item) => item.id === project.selected)}
          activities={filteredActivities}
        />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={62} className="p-2 space-y-2">
        <h2>タスク</h2>
        <Gantt tasks={filteredTasks} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
