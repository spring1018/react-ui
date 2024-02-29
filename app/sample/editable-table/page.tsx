"use client";
import { SimpleShadcnuiTable } from "@/components/organisms/SimpleShadcnuiTable";
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
    editableOnRowClick: true,
  },
  {
    accessorKey: "status",
    title: "Status",
    componentType: "select",
    editableOnRowClick: true,
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
    editableOnRowClick: true,
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

  return (
    <div className="px-2 py-2">
      <SimpleShadcnuiTable columnDefs={columnDefs} defaultData={data} />
    </div>
  );
}
