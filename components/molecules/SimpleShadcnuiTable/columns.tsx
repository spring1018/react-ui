"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CustomSelect } from "@/components/atoms/CustomSelect";
import { Input } from "@/components/ui/input";
import { columnDefs } from "./columnDefs";
import { DataTableColumnHeader } from "./data-table-column-header";

export const columns: ColumnDef<any>[] = columnDefs.map((columnDef) => {
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
