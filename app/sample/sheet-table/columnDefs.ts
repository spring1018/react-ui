export const columnDefs = [
  {
    accessorKey: "_",
    title: "",
    componentType: "button",
  },
  {
    accessorKey: "id",
    title: "ID",
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
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priority",
    title: "Priority",
    componentType: "select",
    params: {
      selectOptions: [
        {
          value: "low",
          label: "Low",
        },
        {
          value: "medium",
          label: "Medium",
        },
        {
          value: "high",
          label: "High",
        },
      ],
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
