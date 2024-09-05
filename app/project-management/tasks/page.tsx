import { DataTable } from "@/components/organisms/DataTable";
import { statuses } from "./_components/options";
import { taskTableColumns } from "./_components/task-table-columns";

export default async function TasksPage() {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/project-management/tasks`,
    {
      cache: "no-cache",
    },
  )
    .then((res) => res.json())
    .then((data) => data.tasks);

  return (
    <div className="p-4">
      <DataTable
        data={data}
        columns={taskTableColumns}
        facetOptions={[
          { columnTitle: "status", columnLabel: "Status", options: statuses },
        ]}
      />
    </div>
  );
}
