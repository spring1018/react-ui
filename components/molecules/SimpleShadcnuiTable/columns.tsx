"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./data-table-column-header";
import { Task } from "./schema";

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

// const checkboxColumn: ColumnDef<Task> = {
//   id: "select",
//   header: ({ table }) => (
//     <Checkbox
//       checked={
//         table.getIsAllPageRowsSelected() ||
//         (table.getIsSomePageRowsSelected() && "indeterminate")
//       }
//       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//       aria-label="Select all"
//       className="translate-y-[2px]"
//     />
//   ),
//   cell: ({ row }) => (
//     <Checkbox
//       checked={row.getIsSelected()}
//       onCheckedChange={(value) => row.toggleSelected(!!value)}
//       aria-label="Select row"
//       className="translate-y-[2px]"
//     />
//   ),
//   enableSorting: false,
//   enableHiding: false,
// };

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
