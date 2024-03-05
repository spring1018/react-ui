"use client";

import { Input } from "@/components/atoms/CustomInput";
import { FormBuilder } from "@/components/molecules/FormBuilder";
import { Sheet } from "@/components/molecules/Sheet";
import { Combobox } from "@/components/ui/combobox";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { mutate } from "swr";
import { DataTableColumnHeader } from "./data-table-column-header";

type RowDataProps = {
  id: string;
  [key: string]: string;
};

const PUT = async (rowData: RowDataProps) => {
  try {
    const response = await fetch(
      `http://localhost:3004/mock-sample/${rowData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...rowData }),
      }
    );
  } catch (error) {
    console.error("Error updating data:", error);
  }
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
  const { componentType, editableOnRowClick } = columnConfig;

  const handleChange = (props) => {
    const { value, row, column, table } = props;
    const rowData = { ...row.original, [column.id]: value };
    PUT(rowData);
    props.updateTableData(rowData);
  };

  const DefaultComponent = ({ row }) => {
    return (
      <div className="flex max-w-[500px] h-4 items-center">
        <p className="truncate ...">{row.getValue(columnConfig.accessorKey)}</p>
      </div>
    );
  };

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

  const SheetButton = (props) => {
    return (
      <Sheet
        text="Edit"
        children={
          <FormBuilder
            columnDefs={columnConfigs}
            initialValues={props.row.original}
            openedInSheet={true}
            onSubmit={(values) => {
              PUT(values);
              props.updateTableData(values);
              const newTableData = props.table.options.data.map((row) => {
                return row.id === values.id ? values : row;
              });
              mutate("http://localhost:3004/mock-sample", newTableData, false);
            }}
          />
        }
      />
    );
  };

  return columnConfigs.map((columnConfig: any) => {
    const commonConfig = {
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title={columnConfig.title} />
      ),
      cell: (cellProps: any) => {
        const props = {
          ...cellProps,
          columnConfig,
          updateTableData: cellProps.table.options.meta?.updateData,
        };
        if (columnConfig.componentType === "button") {
          return <SheetButton {...props} />;
        } else {
          return <CellComponent {...props} />;
        }
      },
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
