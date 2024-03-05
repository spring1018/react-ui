"use client";

import { DynamicCell } from "@/components/molecules/DynamicCell";
import { FormSheetButton } from "@/components/molecules/FormSheetButton";
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

const columnHelper = createColumnHelper();

export const getColumnDefs = (columnConfigs: ColumnDef<any>[]): any[] => {
  const defaultFilterFn = (row, id, value) => value.includes(row.getValue(id));

  return columnConfigs.map((columnConfig: any) => {
    const commonConfig = {
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title={columnConfig.title} />
      ),
      cell: (props: any) => {
        const {
          row: { original },
          column: { id },
          table: { options: {meta: {updateData}, data} },
        } = props;

        const handleSubmit = (e) => {
          let values = {};
          if (columnConfig.componentType === "button") {
            values = e;
          } else if (columnConfig.componentType === "input") {
            values = { ...original, [id]: e };
          } else if (columnConfig.componentType === "select") {
            values = { ...original, [id]: e.value };
          }
          PUT(values);
          updateData(values);
          const newTableData = data.map((row) => {
            return row.id === values.id ? values : row;
          });
          mutate("http://localhost:3004/mock-sample", newTableData, false);
        };

        if (columnConfig.componentType === "button") {
          return (
            <FormSheetButton
              headerText="Edit"
              columnDefs={columnConfigs}
              initialValues={original}
              handleSubmit={handleSubmit}
            />
          );
        } else {
          return (
            <DynamicCell
              componentType={
                columnConfig.editableOnRowClick
                  ? columnConfig.componentType
                  : "label"
              }
              initialValue={original[id]}
              options={columnConfig.params?.selectOptions ?? []}
              handleChange={handleSubmit}
            />
          );
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
