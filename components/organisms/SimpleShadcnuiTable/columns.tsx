"use client";

import { Input } from "@/components/atoms/CustomInput";
import { Sheet } from "@/components/molecules/Sheet";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";

const updateData = async (rowData, id) => {
  try {
    const response = await fetch(`http://localhost:3004/mock-sample/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...rowData }),
    });
  } catch (error) {
    console.error("Error updating data:", error);
  }
};

const handleChange = (props) => {
  const { value, row, column, table } = props;
  const id = row.original.id;
  const rowData = { ...row.original, [column.id]: value };
  updateData(rowData, id);
  table.options.meta?.updateData(row.index, column.id, value);
};

type CellComponentProps = {
  row: any;
  column: any;
  table: any;
  getValue: any;
  columnConfig: any;
};

const CellComponent = (props: CellComponentProps) => {
  const { row, column, table, columnConfig } = props;
  const { componentType ,editableOnRowClick } = columnConfig

  const DefaultComponent = ({ row }) => {
    return (
      <div className="flex max-w-[500px] h-4 items-center">
        <p className="truncate ...">{row.getValue(columnConfig.accessorKey)}</p>
      </div>
    );
  };

  if (componentType === "button") {
    return (
      <Sheet
        text="Edit"
        children={
          <div className="flex flex-col space-y-4">
            <Input
              className="border-0"
              onBlurAction={(value) =>
                handleChange({ ...props, value, columnConfig })
              }
              getValue={props.getValue}
            />
            <Button
              className="w-[200px] justify-between border-0"
              onClick={() => handleChange({ ...props, value: "clicked" })}
            >
              Save
            </Button>
          </div>
        }
      >
        edit
      </Sheet>
    );
  }

  if (!editableOnRowClick) {
    return <DefaultComponent row={row} />;
  }

  switch (componentType) {
    case "input":
      return (
        <Input
          className="border-0"
          onBlurAction={(value) => handleChange({ ...props, value })}
          getValue={props.getValue}
        />
      );
    case "select":
      return (
        <Combobox
          className="w-[200px] justify-between border-0"
          options={columnConfig.params?.selectOptions ?? []}
          initialValue={props.row.getValue(columnConfig.accessorKey)}
          onChange={(option) => handleChange({ ...props, value: option.value })}
        />
      );
    default:
      return <DefaultComponent row={row} />;
  }
};

const columnHelper = createColumnHelper();

export const columnDefs = (columnConfigs: ColumnDef<any>[]): any[] => {
  const defaultFilterFn = (row, id, value) => value.includes(row.getValue(id));

  return columnConfigs.map((columnConfig: any) => {
    const commonConfig = {
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title={columnConfig.title} />
      ),
      cell: (props) => CellComponent({ ...props, columnConfig }),
    };

    const specificConfig =
      columnConfig.componentType === "select"
        ? { filterFn: defaultFilterFn }
        : {};

    return columnHelper.accessor(columnConfig.accessorKey, {
      ...columnConfig,
      ...commonConfig,
      ...specificConfig,
    });
  });
};
