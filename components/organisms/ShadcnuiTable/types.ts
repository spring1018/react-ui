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
