"use client";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import ProjectList from "./_components/projects/project-list";
import TaskGantt from "./_components/tasks/task-gantt";
import { projects } from "./data/projects";
import { tasks } from "./data/tasks";

const yearOptions = [
  { label: "2024年度", value: "2024" },
  { label: "2023年度", value: "2023" },
  { label: "2022年度", value: "2022" },
  { label: "2021年度", value: "2021" },
];

export default function ProjectManagemetPage() {
  const [searchProject, setSearchProject] = useState("");
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  return (
    <div className="flex gap-4">
      <div className="grid gap-y-2 min-w-[200px]">
        <h1>Projects</h1>
        <Combobox options={yearOptions} initialValue="2024" />
        <Input
          value={searchProject}
          onChange={(e) => setSearchProject(e.target.value)}
          placeholder="Search project"
        />
        <ProjectList
          projects={projects.filter((project) =>
            project.title.includes(searchProject),
          )}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
      </div>
      <div>
        <h1>Tasks</h1>
        <TaskGantt
          tasks={tasks.filter((task) => task.projectId === selectedProject?.id)}
        />
        <h1>Events</h1>
      </div>
    </div>
  );
}
