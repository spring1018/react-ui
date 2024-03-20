import { ExtendedColumnDef } from "../types";

export const getReadOnlyColumns = (columns): ExtendedColumnDef[] => {
  return columns.map((column) => {
    const { accessorKey, title, componentType, params } = column;
    return {
      accessorKey: accessorKey,
      header: title,
      cell: ({ row }) => <div>{row.getValue(accessorKey)}</div>,
    };
  });
  // return [
  //   {
  //     accessorKey: "id",
  //     header: "ID",
  //     cell: ({ row }) => <div>{row.getValue("id")}</div>,
  //   },
  //   {
  //     accessorKey: "title",
  //     header: "Title",
  //     cell: ({ row }) => <div>{row.getValue("title")}</div>,
  //   },
  // ];
};
