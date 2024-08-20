import { getServerSession } from "../../_clients/nextAuth";
import { ProjectTable } from "./_components/project-table";

export default async function ProjectPage() {
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

  return (
    <div>
      <h1>Projects</h1>
      <ProjectTable items={projects} />
    </div>
  );
}
