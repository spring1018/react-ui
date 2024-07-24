import TaskBoard from "./_components/task-board";

export type Task = {
  id: string;
  status: string;
};

export default async function KanbanPage() {
  const tasks = (await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/project-management/tasks`,
    { cache: "no-cache" },
  )
    .then((response) => response.json())
    .then((data) => data.tasks)) as Task[];

  return (
    <div>
      <TaskBoard
        items={tasks.map((task) => ({
          ...task,
          columnId: task.status,
        }))}
      />
    </div>
  );
}
