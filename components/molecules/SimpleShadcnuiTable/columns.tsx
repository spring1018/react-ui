"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CustomSelect } from "@/components/atoms/CustomSelect";
import { Input } from "@/components/ui/input";
import { DataTableColumnHeader } from "./data-table-column-header";

import { useEffect, useState } from "react";

const InputCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  return (
    <Input
      className="border-0"
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
    />
  );
};

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
            <InputCell
              getValue={() => row.getValue(columnConfig.accessorKey)}
              row={row}
              column={columnConfig}
              table={row.table}
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
