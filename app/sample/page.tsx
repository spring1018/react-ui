"use client";
import { SimpleShadcnuiTable } from "@/components/molecules/SimpleShadcnuiTable";
import { columns } from "@/components/molecules/SimpleShadcnuiTable/columns";
import { useState } from "react";

const initData = [
  {
    id: "TASK-8782",
    title:
      "You can't compress the program without quantifying the open-source SSD pixel!",
    status: "in progress",
    label: "documentation",
    priority: "medium",
  },
  {
    id: "TASK-7878",
    title:
      "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
    status: "backlog",
    label: "documentation",
    priority: "medium",
  },
  {
    id: "TASK-7839",
    title: "We need to bypass the neural TCP card!",
    status: "todo",
    label: "bug",
    priority: "high",
  },
];

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
  const [data, setData] = useState(initData);

  return (
    <div className="px-2 py-2">
      <SimpleShadcnuiTable columns={columns(columnDefs)} data={data} />
    </div>
  );
}
