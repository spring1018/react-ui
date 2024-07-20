"use client";

import { DynamicForm } from "@/components/molecules/DynamicForm";
import { useRouter } from "next/navigation";
import * as z from "zod";

const createFormSchema = z.object({
  title: z
    .string({ required_error: "Please select an email to display." })
    .describe({ type: "input", placeholder: "title" }),
  status: z.string().describe({
    type: "input",
  }),
  priority: z.string().describe({
    type: "input",
  }),
});

const apiUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/sample/sheet-table-with-db`;

export default function Form() {
  const router = useRouter();

  const handleSubmit = async (e) => {
    await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e),
    });
    router.refresh();
  };

  return (
    <DynamicForm
      mode="create"
      formSchema={createFormSchema}
      handleSubmit={(e) => handleSubmit(e)}
    />
  );
}
