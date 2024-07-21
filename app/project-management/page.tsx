import { getServerSession } from "../_clients/nextAuth";
import Project from "./_components/projects/project";
import { Task } from "./type";

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
  const session = await getServerSession();
  const projects = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/project-management/projects`,
    {
      cache: "no-cache",
    },
  )
    .then((res) => res.json())
    .then((data) => data.projects);

  const departments = session?.user.departments.map((department) => {
    return {
      value: department.id,
      label: department.name,
    };
  });

  const apiUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/project-management/tasks`;
  const tasks: Task[] = await fetch(apiUrl, { cache: "no-cache" })
    .then((res) => res.json())
    .then((data) => data.tasks);

  return (
    <div>
      <Project projects={projects} tasks={tasks} departments={departments} />
    </div>
  );
}
