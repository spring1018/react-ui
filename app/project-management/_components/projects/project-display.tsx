import Timeline from "@/components/organisms/Timeline";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Project, ProjectActivity } from "../../type";
import ProjectForm from "./project-form";

interface ProjectDisplayProps {
  item: Project | undefined;
  activities: ProjectActivity[];
}

export default function ProjectDisplay({
  item,
  activities,
}: ProjectDisplayProps) {
  return (
    <div className="space-y-2 overflow-y-auto">
      <h2 className="mx-2">プロジェクト詳細</h2>
      <ScrollArea className="h-[85vh]">
        <Tabs defaultValue="overview">
          <TabsList className="mx-2">
            <TabsTrigger value="overview">概要</TabsTrigger>
            <TabsTrigger value="activity">活動</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <ProjectForm defaultValues={item} key={item?.id || ""} />
          </TabsContent>
          <TabsContent value="activity">
            <div className="p-2 space-y-4">
              {activities.map((activity) => (
                <Timeline
                  key={activity.id}
                  userName={activity.userId}
                  date={activity.createdAt}
                  tag={activity.tag}
                  content={activity.content}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </div>
  );
}
