"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import SheetForm from "@/components/molecules/SheetForm";
import { mutate } from "swr";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { DELETE, POST, PUT } from "./utils/apis";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  defaultData: TData[];
  apiUrl?: string;
} & (
  | {
      enablePost: true;
      formSchama: Record<string, string>[];
    }
  | {
      enablePost?: false | undefined;
      formSchema?: undefined;
    }
);

export function ShadcnuiTable<TData, TValue>({
  columns,
  defaultData,
  apiUrl,
  enablePost = false,
  formSchama,
}: DataTableProps<TData, TValue>) {
  const [data, setData] = React.useState<TData[]>(defaultData);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    meta: {
      updateData: async (
        newData: { id: string; [key: string]: string },
        method: "POST" | "PUT" | "DELETE",
      ) => {
        if (!apiUrl) return;
        let newTableData: TData[] = [];
        switch (method) {
          case "POST": {
            const res = await POST(newData, apiUrl);
            newTableData = data.concat(res);
            break;
          }
          case "PUT": {
            PUT(newData, apiUrl);
            newTableData = data.map((row) => {
              return row.id === newData.id ? newData : row;
            });
            break;
          }
          case "DELETE": {
            DELETE(newData.id, apiUrl);
            newTableData = data.filter((row) => row.id !== newData.id);
            break;
          }
        }
        setData(newTableData);
        mutate(apiUrl, newTableData, false);
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        enablePost={enablePost}
        PostButton={() => (
          <SheetForm
            mode="create"
            formSchema={formSchama}
            initialValues={{}}
            handleSubmit={(data) =>
              table.options.meta?.updateData(data, "POST")
            }
          />
        )}
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            ({ column }) => (
                              <DataTableColumnHeader
                                column={column}
                                title={header.column.columnDef.header as string}
                              />
                            ),
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
