import * as z from "zod";

const statuses = [
  {
    value: "todo",
    label: "ToDo",
  },
  {
    value: "in-progress",
    label: "In Progress",
  },
  {
    value: "done",
    label: "Done",
  },
];

export const createFormSchema = z.object({
  name: z
    .string({ required_error: "タスク名は必須です" })
    .describe({ type: "input" }),
  type: z.string().describe({ type: "input" }),
  level: z.coerce.number().describe({ type: "input", disabled: true }),
  start: z.date().describe({ type: "date" }),
  end: z.date().describe({ type: "date" }),
  progress: z.coerce.number().describe({ type: "input" }),
  projectId: z.string().describe({ type: "input" }),
});

export const updateFormSchema = z.object({
  id: z.string().describe({ type: "input", disabled: true }),
  name: z
    .string({ required_error: "タスク名は必須です" })
    .describe({ type: "input" }),
  type: z.string().describe({ type: "input" }),
  status: z.string().describe({
    type: "combobox",
    options: statuses,
  }),
  description: z.string().describe({ type: "input" }),
  level: z.coerce.number().describe({ type: "input" }),
  start: z.date().describe({ type: "date" }),
  end: z.date().describe({ type: "date" }),
  progress: z.coerce.number().describe({ type: "input" }),
  projectId: z.string().describe({ type: "input" }),
});
