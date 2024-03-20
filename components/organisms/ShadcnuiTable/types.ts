import { ColumnDef as ReactTableColumnDef } from "@tanstack/react-table";

export type SelectOption = {
  value: string;
  label: string;
};

export type ColumnDef = {
  accessorKey: string;
  title: string;
  componentType: "button" | "input" | "select";
  params?: { selectOptions: SelectOption[] };
};

export type ExtendedColumnDef<T> = ReactTableColumnDef<T> &
  (
    | {
        enableFacetFilter: true;
        facetFilterOptions: { value: string; label: string }[];
      }
    | {
        enableFacetFilter?: false | undefined;
        facetFilterOptions?: undefined;
      }
  );
