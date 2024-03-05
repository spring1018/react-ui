"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

// import { DataTableViewOptions } from "@/app/examples/tasks/components/data-table-view-options"
import { FormSheetButton } from "@/components/molecules/FormSheetButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  columnDefs: any[];
}

function mapToOptions(arg: Map<any, number> | undefined) {
  const arr = Array.from(arg?.entries() ?? []);
  return arr.map(([key, value]) => ({
    label: key,
    value: key,
  }));
}

export function DataTableToolbar<TData>({
  table,
  columnDefs,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const facetedColumns = table.getAllColumns().filter((column) => {
    return column.columnDef.componentType === "select";
  });

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter data..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {facetedColumns.map((column) => {
          return (
            <DataTableFacetedFilter
              key={column.id}
              column={table.getColumn(column.id)}
              title={column.id}
              options={column.columnDef.params?.selectOptions}
            />
          );
        })}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
        <div className="flex justify-end">
          <FormSheetButton headerText="登録" columnDefs={columnDefs} />
        </div>
      </div>
      {/* <DataTableViewOptions table={table} /> */}
    </div>
  );
}
