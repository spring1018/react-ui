"use client";

import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { DataTableColumnHeader } from "./data-table-column-header";

const handleUpdate = async (rowData, id) => {
  try {
    const response = await fetch(`http://localhost:3004/mock-sample/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...rowData}),
    });
  } catch (error) {
    console.error("Error updating data:", error);
  }
};

type CellComponentProps = {
  row: any;
  column: any;
  getValue: any;
  table: any;
  columnConfig: any;
};

const DefaultCell = (props: CellComponentProps) => {
  const { row, columnConfig } = props;
  return (
    <div className="flex max-w-[500px] h-1 items-center">
      {row.getValue(columnConfig.accessorKey)}
    </div>
  );
};

const InputCell = (props: CellComponentProps) => {
  const { getValue, row, column, table } = props;
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
      const rowData = { ...row.original, [column.id]: value };
      handleUpdate(rowData, id);
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

const SelectCell = (props: CellComponentProps) => {
  const { row, column, table, columnConfig } = props;

  const handleChange = (option) => {
    const id = row.original.id;
    const value = option.value;
    const body = { ...row.original, [column.id]: value };
    handleUpdate(body, id);
    table.options.meta?.updateData(row.index, column.id, value);
  };

  return (
    <Combobox
      className="w-[200px] justify-between border-0"
      options={columnConfig.params?.selectOptions ?? []}
      initialValue={props.row.getValue(columnConfig.accessorKey)}
      onChange={handleChange}
    />
  );
};

const cellComponent = (props: CellComponentProps) => {
  const { columnConfig } = props;
  const componentType = columnConfig.componentType;
  switch (componentType) {
    case "input":
      return InputCell(props);
    case "select":
      return SelectCell(props);
    default:
      return DefaultCell(props);
  }
};

const columnHelper = createColumnHelper();

export const columnDefs = (columnConfigs: ColumnDef<any>[]): any[] => {
  return columnConfigs.map((columnConfig: any) => {
    return columnHelper.accessor(columnConfig.accessorKey, {
      ...columnConfig,
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title={columnConfig.title} />
      ),
      cell: (props) => cellComponent({ ...props, columnConfig }),
    });
  });
};
