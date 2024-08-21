import { MultiSelect } from "@/components/molecules/MultiSelect";
import { Badge } from "@/components/ui/badge";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useState } from "react";
import { RiAddCircleFill } from "react-icons/ri";
import { type Department, type Project } from "../../type";
import { useProject } from "../hooks/use-project";

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
    <div className="flex flex-col gap-2 h-full">
      <div className="flex justify-between items-center pl-6 pr-2">
        <h2>プロジェクト一覧</h2>
        <RiAddCircleFill
          size={20}
          className="cursor-pointer"
          onClick={() => setProject({ selected: "" })}
        />
      </div>
      <div className="flex flex-col gap-y-2 px-2">
        <Combobox
          className="text-black"
          options={yearOptions}
          initialValue="2024"
        />
        <Combobox
          className="text-black"
          options={tagOptions}
          initialValue="tag1"
        />
        <MultiSelect
          options={departments}
          selected={department}
          onChange={setDepartment}
          placeholder="部署の選択"
        />
        <Input
          className="text-black"
          value={searchProject}
          onChange={(e) => setSearchProject(e.target.value)}
          placeholder="プロジェクトの検索"
        />
      </div>
      <Separator />
      <ScrollArea className="h-[90vh] px-2">
        <div className="flex flex-col gap-2">
          {items
            .filter((item) => item.title.includes(searchProject))
            .map((item) => (
              <Link
                key={item.id}
                href={{
                  pathname: "/project-management",
                  query: { projectId: item.id },
                }}
                className={`flex flex-col items-start gap-2 rounded-lg border p-2 text-left text-sm w-full transition-all hover:bg-slate-500 ${
                  project.selected === item.id ? "bg-slate-300 text-black" : ""
                }`}
                onClick={() => setProject({ ...project, selected: item.id })}
              >
                <div className="line-clamp-2">{item.title}</div>
                <div className="flex gap-2">
                  <Badge className="bg-slate-600">Tag</Badge>
                  <Badge className="bg-slate-600">X%</Badge>
                </div>
              </Link>
            ))}
        </div>
      </ScrollArea>
    </div>
  );
}
