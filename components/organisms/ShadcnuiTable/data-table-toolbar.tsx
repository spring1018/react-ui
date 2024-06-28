"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  enablePost?: boolean;
  formSchema?: Record<string, string>[];
}

export function DataTableToolbar<TData>({
  table,
  enablePost = false,
  PostButton,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getHeaderGroups().map((headerGroup) =>
          headerGroup.headers.map((header) => {
            const {
              accessorKey,
              header: title,
              enableFacetFilter,
              facetFilterOptions,
            } = header.column.columnDef;
            if (!enableFacetFilter) {
              return null;
            }
            return (
              <DataTableFacetedFilter
                key={accessorKey}
                column={table.getColumn(accessorKey)}
                title={title as string}
                options={facetFilterOptions}
              />
            );
          }),
        )}
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
      </div>
      {enablePost && <PostButton />}
    </div>
  );
}
