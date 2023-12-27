import type { Meta, StoryObj } from "@storybook/react";
import { SimpleShadcnuiTable } from ".";
import { columnConfigs } from "./columnConfigs";
import { columns } from "./columns";
type T = typeof SimpleShadcnuiTable;

const data = [
  {
    id: "TASK-8782",
    title:
      "You can't compress the program without quantifying the open-source SSD pixel!",
    status: "in progress",
    label: "documentation",
    priority: "medium",
  },
  {
    id: "TASK-7878",
    title:
      "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
    status: "backlog",
    label: "documentation",
    priority: "medium",
  },
  {
    id: "TASK-7839",
    title: "We need to bypass the neural TCP card!",
    status: "todo",
    label: "bug",
    priority: "high",
  },
];

export default {
  title: "molecules/SimpleShadcnuiTable",
  component: SimpleShadcnuiTable,
  args: {
    columns: columns(columnConfigs),
    data,
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {
  args: {
    columns: columns([
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
    ]),
    data,
  },
};
