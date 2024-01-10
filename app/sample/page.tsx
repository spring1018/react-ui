"use client";
import { SimpleShadcnuiTable } from "@/components/molecules/SimpleShadcnuiTable";
import { columns } from "@/components/molecules/SimpleShadcnuiTable/columns";
import useSWR from "swr";

const columnDefs = [
  {
    accessorKey: "id",
    title: "ID",
  },
  {
    accessorKey: "title",
    title: "Title",
    componentType: "input",
  },
  {
    accessorKey: "status",
    title: "Status",
    componentType: "select",
    params: {
      selectOptions: [
        {
          value: "backlog",
          label: "Backlog",
        },
        {
          value: "todo",
          label: "To Do",
        },
        {
          value: "in progress",
          label: "In Progress",
        },
      ],
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priority",
    title: "Priority",
    componentType: "select",
    params: {
      selectOptions: [
        {
          value: "low",
          label: "Low",
        },
        {
          value: "medium",
          label: "Medium",
        },
        {
          value: "high",
          label: "High",
        },
      ],
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];

export default function Sample() {
  const fetcher = (url: string): Promise<any> => fetch(url).then(res => res.json());
  const { data, error } = useSWR('http://localhost:3004/mock-sample', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  // const [data, setData] = useState(initData);

  return (
    <div className="px-2 py-2">
      <SimpleShadcnuiTable columns={columns(columnDefs)} data={data} />
    </div>
  );
}
