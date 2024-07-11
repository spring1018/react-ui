import * as z from "zod";

export const createFormSchema = z.object({
  name: z
    .string({ required_error: "タスク名は必須です" })
    .describe({ type: "input" }),
  type: z.string().describe({ type: "input" }),
  start: z.date().describe({ type: "input" }),
  end: z.date().describe({ type: "input" }),
  progress: z.number().describe({ type: "input" }),
  projectId: z.string().describe({ type: "input" }),
});

export const updateFormSchema = z.object({
  id: z.string().describe({ type: "input", disabled: true }),
  name: z
    .string({ required_error: "タスク名は必須です" })
    .describe({ type: "input" }),
  type: z.string().describe({ type: "input" }),
  start: z.date().describe({ type: "date" }),
  end: z.date().describe({ type: "date" }),
  progress: z.number().describe({ type: "input" }),
  projectId: z.string().describe({ type: "input" }),
});
