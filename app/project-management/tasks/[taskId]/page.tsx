import CustomForm from "@/app/sample/form/custom-form";

export default async function TaskDisplayPage({ params }) {
  const task = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/project-management/tasks/${params.taskId}`,
    {
      cache: "no-cache",
    },
  )
    .then((res) => res.json())
    .then((data) => {
      return {
        ...data.task,
        start: new Date(data.task.start),
        end: new Date(data.task.end),
      };
    });

  return (
    <div className="flex justify-center">
      <CustomForm defaultValues={task} />
    </div>
  );
}
