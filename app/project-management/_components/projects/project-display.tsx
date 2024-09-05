import { Timeline } from "@/components/organisms/Timeline";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Project, ProjectActivity } from "../../type";
import ActivityForm from "../activities/activity-form";
import { ActivityFormDialog } from "../activities/activity-form-dialog";
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
          <TabsContent value="activity" className="p-2 space-y-2">
            <ActivityFormDialog />
            <Timeline
              items={activities.map((activity) => ({
                userName: activity.userId,
                date: activity.createdAt,
                tag: activity.tag,
                content: activity.content,
                DialogContentComponent: () => (
                  <ActivityForm defaultValues={activity} />
                ),
              }))}
            />
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </div>
  );
}
