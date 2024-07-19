import { Combobox } from "@/components/ui/combobox";
import ProjectList from "./_components/projects/project-list";
import TaskGantt from "./_components/tasks/task-gantt";
import { projects } from "./data/projects";
import { Task } from "./type";

const taskTypeOptions = [
  { label: "All", value: "all" },
  { label: "タスク", value: "task" },
  { label: "マイルストーン", value: "milestone" },
];

// project を連動して変更したい場合に使う
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

export default async function ProjectManagementPage() {
  const apiUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/project-management/tasks`;
  const tasks: Task[] = await fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => data.tasks);

  return (
    <div className="flex gap-4">
      <div className="grid gap-y-2 min-w-[230px] w-[230px] fixed top-[65px] left-0 h-full bg-white shadow-lg p-4">
        <ProjectList projects={projects} />
      </div>
      <div className="flex-1 overflow-hidden ml-[200px] px-2">
        <div className="w-[500px]">
          {/* <p>{selectedProject?.title}</p> */}
          <p>{projects[0].title}</p>
          {/* <p>{selectedProject?.description}</p> */}
          <p>{projects[0].description}</p>
        </div>
        <Combobox
          options={taskTypeOptions}
          initialValue="all"
          // onChange={handleTaskTypeChange}
        />
        {/* <div className="overflow-x-auto"> */}
        <div>
          {tasks && tasks.length > 0 ? (
            <TaskGantt
              tasks={tasks
                .sort((a, b) => {
                  if (a.sortKey < b.sortKey) return -1;
                  if (a.sortKey > b.sortKey) return 1;
                  return 0;
                })
                .map((task: { start: string; end: string }) => ({
                  ...(task as object),
                  start: new Date(task.start),
                  end: new Date(task.end),
                }))}
            />
          ) : (
            <p>loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}
