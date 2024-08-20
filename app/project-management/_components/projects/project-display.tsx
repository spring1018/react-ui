import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Project } from "../../type";
import ProjectForm from "./project-form";

interface ProjectDisplayProps {
  item: Project | undefined;
}

export default function ProjectDisplay({ item }: ProjectDisplayProps) {
  return (
    <div>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">概要</TabsTrigger>
          <TabsTrigger value="activity">活動</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <ProjectForm defaultValues={item} key={item?.id || ""} />
        </TabsContent>
        <TabsContent value="activity">
          <div>
            <h2>活動</h2>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
