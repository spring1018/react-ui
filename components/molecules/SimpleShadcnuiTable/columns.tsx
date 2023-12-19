"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CustomSelect } from "@/components/atoms/CustomSelect";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { DataTableColumnHeader } from "./data-table-column-header";

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  priority: z.string(),
});

export type Task = z.infer<typeof taskSchema>;

type ColumnDefType = {
  accessorKey: keyof Task;
  title: string;
  componentType?: "input" | "select";
  params?: {
    selectOptions?: {
      value: string;
      label: string;
    }[];
  }
};

const columnDefs: ColumnDefType[] = [
  {
    accessorKey: "id",
    title: "Task",
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
    cell: ({ row }) => {
      if (columnDef.componentType === "input") {
        return (
          <Input
            type="text"
            value={row.getValue(columnDef.accessorKey)}
            onChange={(e) => {
              // Handle input change if needed
            }}
          />
        );
      } else if (columnDef.componentType === "select") {
        return (
          <CustomSelect
            options={columnDef.params?.selectOptions ?? []}
            initialValue={row.getValue(columnDef.accessorKey)}
            onChange={(value) => {
              // Handle select change if needed
            }}
          />
        );
      }

      return (
        <div className="flex max-w-[500px] h-1 items-center">
          {row.getValue(columnDef.accessorKey)}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  };
});
