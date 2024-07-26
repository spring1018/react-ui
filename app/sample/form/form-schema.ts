import * as z from "zod";
import { priorities, statuses } from "../sheet-table/options";

export const formSchema = z.object({
  id: z.string().describe({ type: "input", disabled: true }),
  title: z
    .string({ required_error: "Please select an email to display." })
    .describe({ type: "input", placeholder: "title" }),
  status: z.string().describe({
    type: "combobox",
    options: statuses,
  }),
  priority: z.string().describe({
    type: "combobox",
    options: priorities,
  }),
  hiddenField: z.string().describe({
    type: "hidden",
  }),
});
