"use client";

import SheetForm from "@/components/molecules/SheetForm";
import { ExtendedColumnDef } from "@/components/organisms/ShadcnuiTable/types";
import { ColumnDef } from "@tanstack/react-table";
import * as z from "zod";
import { priorities, statuses } from "./options";
import { Task } from "./schema";

const formSchema = z.object({
  id: z.string().describe({ type: "input" }),
  title: z
    .string({ required_error: "Please select an email to display." })
    .describe({ type: "input", placeholder: "email@example.com" }),
  status: z.string().describe({
    type: "combobox",
    options: statuses,
  }),
  priority: z.string().describe({
    type: "combobox",
    options: priorities,
  }),
});

export const formColumnDefs = [
  {
    accessorKey: "title",
    title: "Title",
    componentType: "input",
  },
  {
    accessorKey: "status",
    title: "Status",
    componentType: "select",
    params: {
      selectOptions: statuses,
    },
  },
  {
    accessorKey: "priority",
    title: "Priority",
    componentType: "select",
    params: {
      selectOptions: priorities,
    },
  },
];

export const columns: ExtendedColumnDef<ColumnDef<Task>>[] = [
  {
    id: "button",
    header: "",
    cell: ({ row, table }) => (
      // <FormSheetButton
      //   columnDefs={formColumnDefs}
      //   initialValues={row.original}
      //   handleSubmit={(e) => table.options.meta?.updateData(e, "PUT")}
      //   handleDelete={() =>
      //     table.options.meta?.updateData(row.original, "DELETE")
      //   }
      // />
      <SheetForm
        // mode="update"
        formSchema={formSchema}
        initialValues={row.original}
        handleSubmit={(data) => console.log(data)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    enableFacetFilter: true,
    facetFilterOptions: statuses,
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status"),
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    enableFacetFilter: true,
    facetFilterOptions: priorities,
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority"),
      );

      if (!priority) {
        return null;
      }

      return (
        <div className="flex items-center">
          <span>{priority.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
