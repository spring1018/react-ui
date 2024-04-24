import type { Meta, StoryObj } from "@storybook/react";
import { ShadcnuiTable } from ".";
import { columns, formColumnDefs } from "./columns";
import { getReadOnlyColumns } from "./utils/get-readonly-columns";

type T = typeof ShadcnuiTable;

const defaultData = [
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
    defaultData,
    enablePost: true,
    postFormColumnDefs: formColumnDefs,
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};

const readOnlyColumns = getReadOnlyColumns([
  { accessorKey: "id", title: "ID" },
  { accessorKey: "title", title: "Title" },
]);

export const ReadOnly: StoryObj<T> = {
  args: {
    columns: readOnlyColumns,
    enablePost: false,
  },
};
