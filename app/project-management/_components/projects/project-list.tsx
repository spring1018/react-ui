"use client";
import { Badge } from "@/components/ui/badge";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Project } from "../../type";

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

export default function ProjectList({ projects }: { projects: Project[] }) {
  const [searchProject, setSearchProject] = useState("");
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid max-h-[200px] gap-y-2">
        <Combobox options={yearOptions} initialValue="2024" />
        <Combobox options={tagOptions} initialValue="tag1" />
        <Input
          value={searchProject}
          onChange={(e) => setSearchProject(e.target.value)}
          placeholder="Search project"
        />
        <Separator />
      </div>
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
              <div className="flex gap-2">
                <Badge>Tag</Badge>
                <Badge>X%</Badge>
              </div>
            </button>
          ))}
      </ScrollArea>
    </div>
  );
}
