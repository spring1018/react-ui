import { DataTable } from "@/components/organisms/DataTable";
import { columns } from "./columns";
import { data } from "./data";
import { priorities, statuses } from "./options";

export default async function DataTablePage() {
  return (
    <div className="p-2">
      <DataTable
        data={data}
        columns={columns}
        facetOptions={[
          {
            columnTitle: "status",
            columnLabel: "Status",
            options: statuses,
          },
          {
            columnTitle: "priority",
            columnLabel: "Priority",
            options: priorities,
          },
        ]}
      />
    </div>
  );
}
