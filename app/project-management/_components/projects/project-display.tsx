import Timeline from "@/components/organisms/Timeline";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Project, ProjectActivity } from "../../type";
import ProjectForm from "./project-form";

interface ProjectDisplayProps {
  item: Project | undefined;
  activities: ProjectActivity[];
}

// const activities = [
//   {
//     id: 1,
//     projectId: 1,
//     userId: "admin",
//     tag: "info",
//     content: "",
//     createdAt: new Date(),
//   },
//   {
//     id: 2,
//     projectId: 1,
//     userId: "admin",
//     tag: "info",
//     content: "",
//     createdAt: new Date(),
//   },
// ];

export default function ProjectDisplay({
  item,
  activities,
}: ProjectDisplayProps) {
  return (
    <div className="space-y-2">
      <h2>プロジェクト詳細</h2>
      <Tabs defaultValue="overview">
        <TabsList>
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
    </div>
  );
}
