"use client";

import { DynamicForm } from "@/components/molecules/DynamicForm";
import * as z from "zod";
import { priorities, statuses } from "../sheet-table/options";

const formSchema = z.object({
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

export default function FormPage() {
  return (
    <div className="flex justify-center">
      <DynamicForm
        mode="update"
        formSchema={formSchema}
        initialValues={{ id: "test", hiddenField: "hidden" }}
        handleSubmit={(e) => console.log(e)}
      />
    </div>
  );
}
