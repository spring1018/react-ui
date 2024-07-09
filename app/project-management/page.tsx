"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import useSWR from "swr";
import ProjectList from "./_components/projects/project-list";
import TaskGantt from "./_components/tasks/task-gantt";
import { projects } from "./data/projects";

const yearOptions = [
  { label: "2024年度", value: "2024" },
  { label: "2023年度", value: "2023" },
  { label: "2022年度", value: "2022" },
  { label: "2021年度", value: "2021" },
];

const tagOptions = [
  { label: "行動計画", value: "tag1" },
  { label: "その他", value: "tag2" },
];

const taskTypeOptions = [
  { label: "All", value: "all" },
  { label: "タスク", value: "task" },
  { label: "マイルストーン", value: "milestone" },
];

// export function getStartEndDateForProject(tasks: Task[], projectId: string) {
//   const projectTasks = tasks.filter((t) => t.project === projectId);
//   let start = projectTasks[0].start;
//   let end = projectTasks[0].end;

//   for (let i = 0; i < projectTasks.length; i++) {
//     const task = projectTasks[i];
//     if (start.getTime() > task.start.getTime()) {
//       start = task.start;
//     }
//     if (end.getTime() < task.end.getTime()) {
//       end = task.end;
//     }
//   }
//   return [start, end];
// }

export default function ProjectManagemetPage() {
  const [searchProject, setSearchProject] = useState("");
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  const [isProjectOpen, setIsProjectOpen] = useState(true);
  const [isTaskOpen, setIsTaskOpen] = useState(true);

  const [selectedTaskType, setSelectedTaskType] = useState("all");

  const apiUrl = "http://localhost:3004/tasks";

  const fetcher = (url: string): Promise<[]> =>
    fetch(url).then((res) => res.json());
  const { data: tasks = [], error } = useSWR(apiUrl, fetcher);

  const handleTaskChange = (task) => {
    const newTask = {
      id: task.id,
      name: task.name,
      type: task.type,
      status: task.status,
      priority: task.priority,
      progress: task.progress,
      start: task.start.toISOString(),
      end: task.end.toISOString(),
      order: task.order,
    };
    // PUT リクエストを送る
    try {
      fetch(`${apiUrl}/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
    } catch (error) {
      console.error("Error updating data:", error);
    }

    // setTasks(newTasks);
  };

  // const handleTaskTypeChange = (e) => {
  //   const type = e.value;
  //   setSelectedTaskType(type);
  //   if (type === "all") {
  //     setTasks(initTasks);
  //     return;
  //   }
  //   setTasks(initTasks.filter((task) => task.type === type));
  // };

  return (
    <div className="flex gap-4">
      <div className="grid gap-y-2 min-w-[230px] w-[230px] fixed top-[65px] left-0 h-full bg-white shadow-lg p-4">
        <div className="grid max-h-[200px] gap-y-2">
          <h1>Projects</h1>
          <Combobox options={yearOptions} initialValue="2024" />
          <Combobox options={tagOptions} initialValue="tag1" />
          <Input
            value={searchProject}
            onChange={(e) => setSearchProject(e.target.value)}
            placeholder="Search project"
          />
          <Separator />
        </div>
        <ProjectList
          projects={projects.filter((project) =>
            project.title.includes(searchProject),
          )}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
      </div>
      <div className="flex-1 overflow-hidden ml-[200px] px-2">
        <Collapsible open={isProjectOpen} onOpenChange={setIsProjectOpen}>
          <CollapsibleTrigger asChild>
            <button className="btn">詳細</button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="w-[500px]">
              <p>{selectedProject?.title}</p>
              <p>{selectedProject?.description}</p>
            </div>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible open={isTaskOpen} onOpenChange={setIsTaskOpen}>
          <CollapsibleTrigger asChild>
            <button className="btn">Tasks</button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Combobox
              options={taskTypeOptions}
              initialValue="all"
              // onChange={handleTaskTypeChange}
            />
            <div className="overflow-x-auto">
              {tasks && tasks.length > 0 ? (
                <TaskGantt
                  tasks={tasks.map((task: { start: string; end: string }) => ({
                    ...(task as object),
                    start: new Date(task.start),
                    end: new Date(task.end),
                  }))}
                  onDateChange={handleTaskChange}
                />
              ) : (
                <p>loading...</p>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
