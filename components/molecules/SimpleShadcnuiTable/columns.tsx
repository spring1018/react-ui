"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CustomSelect } from "@/components/atoms/CustomSelect";
import { Input } from "@/components/ui/input";
import { DataTableColumnHeader } from "./data-table-column-header";

export const columns = (columnConfigs: ColumnDef<any>[]): any[] => {
  return columnConfigs.map((columnConfig: any) => {
    return {
      ...columnConfig,
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title={columnConfig.title} />
      ),
      cell: ({ row }: any) => {
        if (columnConfig.componentType === "input") {
          return (
            <Input
              type="text"
              value={row.getValue(columnConfig.accessorKey)}
              onChange={(e) => {
                // Handle input change if needed
              }}
            />
          );
        } else if (columnConfig.componentType === "select") {
          return (
            <CustomSelect
              options={columnConfig.params?.selectOptions ?? []}
              initialValue={row.getValue(columnConfig.accessorKey)}
              onChange={(value) => {
                // Handle select change if needed
              }}
            />
          );
        }

        return (
          <div className="flex max-w-[500px] h-1 items-center">
            {row.getValue(columnConfig.accessorKey)}
          </div>
        );
      },
      enableSorting: true,
      enableHiding: false,
    };
  });
};
