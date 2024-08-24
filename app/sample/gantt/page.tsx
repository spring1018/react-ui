import { Gantt } from "./_components/gantt";

export default async function GanttPage() {
  const tasks = await fetch(
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
    <div className="p-2">
      <Gantt tasks={tasks} />
    </div>
  );
}
