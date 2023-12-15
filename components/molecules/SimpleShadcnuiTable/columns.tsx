"use client";

import { ColumnDef } from "@tanstack/react-table";

import { z } from "zod";
import { DataTableColumnHeader } from "./data-table-column-header";

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  priority: z.string(),
});

export type Task = z.infer<typeof taskSchema>;

const columnDefs = [
  {
    accessorKey: "id",
    title: "Task",
  },
  {
    accessorKey: "title",
    title: "Title",
  },
  {
    accessorKey: "status",
    title: "Status",
  },
  {
    accessorKey: "priority",
    title: "Priority",
  },
];

export const columns: ColumnDef<Task>[] = columnDefs.map((columnDef) => {
  return {
    ...columnDef,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={columnDef.title} />
    ),
    cell: ({ row }) => (
      <div className="flex max-w-[500px] h-1 items-center">
        {row.getValue(columnDef.accessorKey)}
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  };
});
