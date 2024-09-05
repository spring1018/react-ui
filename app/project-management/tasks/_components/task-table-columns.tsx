"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TaskSheetForm } from "../../_components/tasks/sheet-form/sheet-form-button";
import { statuses } from "./options";

type Task = {
  id: number;
  title: string;
  status: string;
  priority: string;
};

type ColumnDefWithHeaderTitle<T> = ColumnDef<T> & {
  headerTitle: string;
};

export const taskTableColumns: ColumnDefWithHeaderTitle<Task>[] = [
  {
    accessorKey: "id",
    headerTitle: "ID",
    cell: ({ row }) => (
      <div className="w-[180px]" onClick={() => console.log(row.original)}>
        {row.getValue("id")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    headerTitle: "Title",
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
    accessorKey: "type",
    headerTitle: "Type",
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("type")}</div>,
  },
  {
    accessorKey: "start",
    headerTitle: "Start",
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("start")}</div>,
  },
  {
    accessorKey: "end",
    headerTitle: "End",
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("end")}</div>,
  },
  {
    accessorKey: "progress",
    headerTitle: "Progress",
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("progress")}</div>
    ),
  },
  {
    accessorKey: "status",
    headerTitle: "Status",
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
    accessorKey: "parentTaskId",
    headerTitle: "Parent Task",
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("parentTaskId")}</div>
    ),
  },
  {
    accessorKey: "description",
    headerTitle: "Description",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("description")}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <TaskSheetForm tasks={[]} hidden={false} defaultValues={row.original} />
    ),
  },
];
