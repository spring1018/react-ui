"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { DataTableColumnHeader } from "./data-table-column-header";

const handleUpdate = async (row, newData, id) => {
  try {
    const response = await fetch(`http://localhost:3004/mock-sample/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...row.original, ...newData }),
    });
  } catch (error) {
    console.error("Error updating data:", error);
  }
};

const InputCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const [previousValue, setPreviousValue] = useState(initialValue);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    if (previousValue !== value) {
      setPreviousValue(value);
      const id = row.original.id;
      const body = { id, [column.id]: value };
      handleUpdate(row, body, id);
      table.options.meta?.updateData(row.index, column.id, value);
    }
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

const columnHelper = createColumnHelper();

export const columns = (columnConfigs: ColumnDef<any>[]): any[] => {
  return columnConfigs.map((columnConfig: any) => {
    if (columnConfig.componentType === "input") {
      return columnHelper.accessor(columnConfig.accessorKey, {
        ...columnConfig,
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title={columnConfig.title} />
        ),
        cell: InputCell,
      });
    } else if (columnConfig.componentType === "select") {
      return columnHelper.accessor(columnConfig.accessorKey, {
        ...columnConfig,
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title={columnConfig.title} />
        ),
        cell: ({ row }) => {
          return (
            <Combobox
              options={columnConfig.params?.selectOptions ?? []}
              initialValue={row.getValue(columnConfig.accessorKey)}
              onChange={(value) => {
                handleUpdate(
                  row,
                  { [columnConfig.accessorKey]: value.value },
                  row.original.id
                );
              }}
            />
          );
        },
      });
    }
    return columnHelper.accessor(columnConfig.accessorKey, {
      ...columnConfig,
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title={columnConfig.title} />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex max-w-[500px] h-1 items-center">
            {row.getValue(columnConfig.accessorKey)}
          </div>
        );
      },
      enableSorting: true,
      enableHiding: false,
    });
  });
};
