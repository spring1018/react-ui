import ProjectForm from "../../_components/projects/project-form";

export default async function ProjectDisplayPage({ params }) {
  const project = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/project-management/projects/${params.id}`,
    {
      cache: "no-cache",
    },
  )
    .then((res) => res.json())
    .then((data) => data.project);

  return (
    <div>
      <ProjectForm defaultValues={project} />
    </div>
  );
}
