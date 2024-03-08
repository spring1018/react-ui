export type ColumnConfigType = {
  accessorKey: string;
  title: string;
  componentType?: "input" | "select";
  params?: {
    selectOptions?: {
      value: string;
      label: string;
    }[];
  };
};
