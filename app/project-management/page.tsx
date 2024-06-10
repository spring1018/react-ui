"use client";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import TaskGantt from "./_components/tasks/task-gantt";
// 15個のプロジェクトを定義
const projects = [
  { id: 1, title: "Project 1", description: "Description 1" },
  { id: 2, title: "Project 2", description: "Description 2" },
  { id: 3, title: "Project 3", description: "Description 3" },
  { id: 4, title: "Project 4", description: "Description 4" },
  { id: 5, title: "Project 5", description: "Description 5" },
  { id: 6, title: "Project 6", description: "Description 6" },
  { id: 7, title: "Project 7", description: "Description 7" },
  { id: 8, title: "Project 8", description: "Description 8" },
  { id: 9, title: "Project 9", description: "Description 9" },
  { id: 10, title: "Project 10", description: "Description 10" },
  { id: 11, title: "Project 11", description: "Description 11" },
  { id: 12, title: "Project 12", description: "Description 12" },
  { id: 13, title: "Project 13", description: "Description 13" },
  { id: 14, title: "Project 14", description: "Description 14" },
  { id: 15, title: "Project 15", description: "Description 15" },
];

// 5個のタスクを定義
const tasks = [
  {
    start: new Date(2024, 1, 1),
    end: new Date(2024, 1, 2),
    name: "Task 1",
    id: 1,
    type: "task",
    progress: 45,
    styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
    projectId: 1,
  },
  {
    start: new Date(2024, 1, 2),
    end: new Date(2024, 1, 3),
    name: "Task 2",
    id: 2,
    type: "task",
    progress: 20,
    projectId: 1,
  },
  {
    start: new Date(2024, 1, 3),
    end: new Date(2024, 1, 4),
    name: "Task 3",
    id: 3,
    type: "task",
    progress: 70,
    projectId: 2,
  },
  {
    start: new Date(2024, 1, 4),
    end: new Date(2024, 1, 5),
    name: "Task 4",
    id: 4,
    type: "task",
    progress: 10,
    projectId: 2,
  },
  {
    start: new Date(2024, 1, 5),
    end: new Date(2024, 1, 6),
    name: "Task 5",
    id: 5,
    type: "task",
    progress: 90,
    projectId: 3,
  },
];

const yearOptions = [
  { label: "2021", value: "2021" },
  { label: "2022", value: "2022" },
  { label: "2023", value: "2023" },
  { label: "2024", value: "2024" },
];

export default function ProjectManagemetPage() {
  const [searchProject, setSearchProject] = useState("");
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  return (
    <div className="flex gap-4">
      <div className="grid gap-y-2 min-w-[200px]">
        <h1>Projects</h1>
        <Combobox options={yearOptions} />
        <Input
          value={searchProject}
          onChange={(e) => setSearchProject(e.target.value)}
          placeholder="Search project"
        />
        <ScrollArea className="h-full">
          {projects
            .filter((project) => project.title.includes(searchProject))
            .map((project) => (
              <button
                key={project.title}
                className={`flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm w-full transition-all hover:bg-accent ${
                  project.id === selectedProject.id ? "bg-blue-200" : ""
                }`}
                onClick={() => setSelectedProject(project)}
              >
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </button>
            ))}
        </ScrollArea>
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
