"use client";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
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
  const [showProjectDisplay, setShowProjectDisplay] = useState(true);

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
    <div className="flex gap-4 h-full">
      <div className="grid gap-y-2 min-w-[250px] w-[230px] fixed top-[65px] left-0 h-full bg-white shadow-lg p-4">
        <ProjectList items={projects} departments={departments} />
      </div>
      <div className="flex overflow-hidden ml-[220px] px-4 gap-4 h-[1000px]">
        <div className={`${showProjectDisplay ? "w-1/4" : ""}`}>
          {showProjectDisplay ? (
            <div className="w-[1200px] space-y-2">
              <ChevronLeft
                className="cursor-pointer"
                onClick={() => setShowProjectDisplay(false)}
              />
              <ProjectDisplay
                item={projects.find((item) => item.id === project.selected)}
              />
            </div>
          ) : (
            <div>
              <ChevronRight
                className="cursor-pointer"
                onClick={() => setShowProjectDisplay(true)}
              />
            </div>
          )}
        </div>
        <Separator orientation="vertical" />
        <div className={`${showProjectDisplay ? "w-3/4" : "w-full"} `}>
          <ViewSwitcher />
          <TaskGantt
            viewMode={viewMode}
            projects={projects}
            tasks={filteredTasks}
            projectOptions={projectOptions}
          />
        </div>
      </div>
    </div>
  );
}
