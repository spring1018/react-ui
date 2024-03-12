"use client";

import { ColumnDef } from "@tanstack/react-table";

import { FormSheetButton } from "@/components/molecules/FormSheetButton";
import { DataTableColumnHeader } from "./data-table-column-header";
import { priorities, statuses } from "./options";
import { Task } from "./schema";

const formColumnDefs = [
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
      selectOptions: statuses,
    },
  },
  {
    accessorKey: "priority",
    title: "Priority",
    componentType: "select",
    params: {
      selectOptions: priorities,
    },
  },
];

export const columns: ColumnDef<Task>[] = [
  {
    id: "button",
    header: ({ column }) => <DataTableColumnHeader column={column} title="" />,
    cell: ({ row }) => (
      <FormSheetButton
        columnDefs={formColumnDefs}
        initialValues={row.original}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status"),
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority"),
      );

      if (!priority) {
        return null;
      }

      return (
        <div className="flex items-center">
          <span>{priority.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
