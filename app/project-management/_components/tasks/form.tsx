"use client";
import SheetForm from "@/components/molecules/SheetForm";
import * as z from "zod";

const formSchema = z.object({
  id: z.string().describe({ type: "input" }),
  name: z
    .string({ required_error: "タスク名は必須です" })
    .describe({ type: "input" }),
  progress: z.number().describe({ type: "input" }),
});

export function Form(props) {
  return (
    <SheetForm
      mode="update"
      buttonVariant="outline"
      formSchema={formSchema}
      initialValues={props.initialValues}
      handleSubmit={props.handleSubmit}
    />
  );
}
