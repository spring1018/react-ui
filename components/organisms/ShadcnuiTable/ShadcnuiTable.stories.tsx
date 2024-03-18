import type { Meta, StoryObj } from "@storybook/react";
import { ShadcnuiTable } from ".";
import { columns, formColumnDefs } from "./columns";

type T = typeof ShadcnuiTable;

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
  title: "organisms/ShadcnuiTable",
  component: ShadcnuiTable,
  args: {
    columns,
    defaultData: data,
    enablePost: true,
    formColumnDefs,
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
