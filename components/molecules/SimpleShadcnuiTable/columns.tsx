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
              className="border-0"
              type="text"
              value={row.getValue(columnConfig.accessorKey)}
              // onChange では data を更新し、API は呼ばない
              // onChange={}
              // onBlur では data を更新し、API を呼ぶ
              onBlur={(e) => {
                console.log({
                  id: row.original.id,
                  [columnConfig.accessorKey]: e.target.value,
                });
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
