import { MultiSelect } from "@/components/molecules/MultiSelect";
import { Badge } from "@/components/ui/badge";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { type Department, type Project } from "../../type";
import { useProject } from "../../use-project";

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

interface ProjectListProps {
  items: Project[];
  departments: Department[];
}

export default function ProjectList({ items, departments }: ProjectListProps) {
  const [searchProject, setSearchProject] = useState("");
  const [department, setDepartment] = useState<string[]>([]);
  const [project, setProject] = useProject();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-y-2">
        <Combobox options={yearOptions} initialValue="2024" />
        <MultiSelect
          options={departments}
          selected={department}
          onChange={setDepartment}
          placeholder="Select department"
        />
        <Combobox options={tagOptions} initialValue="tag1" />
        <Input
          value={searchProject}
          onChange={(e) => setSearchProject(e.target.value)}
          placeholder="プロジェクトの検索"
        />
      </div>
      <Separator />
      <ScrollArea className="h-full">
        {items
          .filter((item) => item.title.includes(searchProject))
          .map((item) => (
            <button
              key={item.title}
              className={`flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm w-full transition-all hover:bg-accent ${
                project.selected === item.id ? "bg-blue-200" : ""
              }`}
              onClick={() => setProject({ ...project, selected: item.id })}
            >
              <h3>{item.title}</h3>
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
