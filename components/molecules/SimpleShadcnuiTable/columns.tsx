"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { DataTableColumnHeader } from "./data-table-column-header";

const InputCell = ({ getValue, row, column }) => {
  const initialValue = getValue();
  const [previousValue, setPreviousValue] = useState(initialValue);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleUpdate = async (newData, id) => {
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

  const onBlur = () => {
    if (previousValue !== value) {
      setPreviousValue(value);
      const id = row.original.id;
      const body = { id, [column.accessorKey]: value };
      handleUpdate(body, id);
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
            <Combobox
              options={columnConfig.params?.selectOptions ?? []}
              initialValue={row.getValue(columnConfig.accessorKey)}
              onChange={(value) => {
                console.log("value", {row, columnConfig});
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
