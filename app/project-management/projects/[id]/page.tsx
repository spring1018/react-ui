import ProjectForm from "../../_components/projects/project-form";

export default async function ProjectDisplayPage({ params }) {
  const project = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/project-management/projects/${params.id}`,
    {
      cache: "no-cache",
    },
  )
    .then((res) => res.json())
    .then((data) => {
      return {
        ...data.project,
        start: new Date(data.project.start),
        end: new Date(data.project.end),
      };
    });

  return (
    <div className="flex justify-center">
      <ProjectForm defaultValues={project} />
    </div>
  );
}
