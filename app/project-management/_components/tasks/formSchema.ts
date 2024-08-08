import * as z from "zod";

const statuses = [
  {
    value: "todo",
    label: "未着手",
  },
  {
    value: "in-progress",
    label: "進行中",
  },
  {
    value: "done",
    label: "完了",
  },
];

export function createFormSchema({ projects }) {
  return z.object({
    name: z
      .string({ required_error: "タスク名は必須です" })
      .describe({ type: "input" }),
    type: z.string().describe({ type: "input", type: "hidden" }),
    level: z.coerce.number().describe({ type: "input", disabled: true }),
    status: z.string().describe({ type: "combobox", options: statuses }),
    progress: z.coerce.number().describe({ type: "input" }),
    start: z.date().describe({ type: "date" }),
    end: z.date().describe({ type: "date" }),
    description: z.string().describe({ type: "textarea" }).optional(),
    parentTaskId: z.string().describe({ type: "input" }).optional(),
    projectId: z.string().describe({ type: "combobox", options: projects }),
  });
}

export function updateFormSchema({ projects }) {
  return z.object({
    id: z.string().describe({ type: "input", disabled: true }),
    name: z
      .string({ required_error: "タスク名は必須です" })
      .describe({ type: "input" }),
    type: z.string().describe({ type: "input", type: "hidden" }),
    level: z.coerce.number().describe({ type: "input" }),
    status: z.string().describe({ type: "combobox", options: statuses }),
    progress: z.coerce.number().describe({ type: "input" }),
    start: z.date().describe({ type: "date" }),
    end: z.date().describe({ type: "date" }),
    description: z.string().describe({ type: "textarea" }).optional(),
    parentTaskId: z.string().describe({ type: "input" }),
    projectId: z.string().describe({ type: "combobox", options: projects }),
  });
}
