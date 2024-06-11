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
import EventDescription from "./_components/events/event-description";
import EventList from "./_components/events/event-list";
import ProjectList from "./_components/projects/project-list";
import TaskGantt from "./_components/tasks/task-gantt";
import { events } from "./data/events";
import { projects } from "./data/projects";
import { tasks } from "./data/tasks";

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

export default function ProjectManagemetPage() {
  const [searchProject, setSearchProject] = useState("");
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [selectedEvent, setSelectedEvent] = useState(events[0]);

  const [isProjectOpen, setIsProjectOpen] = useState(true);
  const [isTaskOpen, setIsTaskOpen] = useState(true);

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
            <div className="overflow-x-auto">
              <TaskGantt
                tasks={tasks.filter(
                  (task) => task.projectId === selectedProject?.id,
                )}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
        <div>
          <h1>Events</h1>
          <div>
            <div className="flex gap-4">
              <EventList
                events={events}
                selectedEvent={selectedEvent}
                setSelectedProject={setSelectedEvent}
              />
              <EventDescription event={selectedEvent} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
