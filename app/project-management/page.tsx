import { getServerSession } from "../_clients/nextAuth";
import Project from "./_components/projects/project";
import { Task } from "./type";

export default async function ProjectManagementPage() {
  const session = await getServerSession();
  const projects = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/project-management/projects`,
    {
      cache: "no-cache",
    },
  )
    .then((res) => res.json())
    .then((data) =>
      data.projects.map((project) => {
        return {
          ...project,
          start: new Date(project.start),
          end: new Date(project.end),
        };
      }),
    );

  const activities = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/project-management/project-activities`,
    {
      cache: "no-cache",
    },
  )
    .then((res) => res.json())
    .then((data) => data.projectActivities);

  const departments = session?.user.departments.map((department) => {
    return {
      value: department.id,
      label: department.name,
    };
  });

  const projectOptions = projects.map((project) => {
    return {
      value: project.id,
      label: project.title,
    };
  });

  const tasks: Task[] = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/project-management/tasks`,
    {
      cache: "no-cache",
    },
  )
    .then((res) => res.json())
    .then((data) =>
      data.tasks
        .map((task) => ({
          ...task,
          start: new Date(task.start),
          end: new Date(task.end),
        }))
        .sort((a, b) => {
          if (a.sortKey < b.sortKey) return -1;
          if (a.sortKey > b.sortKey) return 1;
          return 0;
        }),
    );

  return (
    <Project
      projects={projects}
      tasks={tasks}
      activities={activities}
      departments={departments}
      projectOptions={projectOptions}
    />
  );
}
