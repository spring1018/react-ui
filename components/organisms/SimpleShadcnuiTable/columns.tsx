"use client";

import { Input } from "@/components/atoms/CustomInput";
import { FormBuilder } from "@/components/molecules/FormBuilder";
import { Sheet } from "@/components/molecules/Sheet";
import { Combobox } from "@/components/ui/combobox";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";

type RowDataProps = {
  id: string;
  [key: string]: string;
};

const PUT = async (rowData: RowDataProps) => {
  try {
    const response = await fetch(`http://localhost:3004/mock-sample/${rowData.id}`, {
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

const updateTableData = (table, id, columnId, value) => {
  table.options.meta?.updateData(id, columnId, value);
};

const handleChange = (props) => {
  const { value, row, column, table } = props;
  const rowData = { ...row.original, [column.id]: value };
  PUT(rowData);
  updateTableData(table, row.original.id, column.id, value);
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

  const SheetButton = ({ row }) => {
    return (
      <Sheet
        text="Edit"
        children={
          <FormBuilder
            columnDefs={columnConfigs}
            initialValues={row}
            openedInSheet={true}
            // onSubmit={PUT}
            onSubmit={(values) => console.log("values", values)}
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
      cell: (props: any) => {
        if (columnConfig.componentType === "button") {
          return <SheetButton row={props.row.original} table={props.table}/>;
        } else {
          return <CellComponent {...props} columnConfig={columnConfig} />;
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
