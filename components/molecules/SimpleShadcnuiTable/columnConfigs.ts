import { ColumnConfigType } from "./columnConfigType";

export const columnConfigs: ColumnConfigType[] = [
  {
    accessorKey: "id",
    title: "Task",
  },
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
      selectOptions: [
        {
          value: "backlog",
          label: "Backlog",
        },
        {
          value: "todo",
          label: "To Do",
        },
        {
          value: "in progress",
          label: "In Progress",
        },
      ],
    },
  },
  {
    accessorKey: "priority",
    title: "Priority",
  },
];
