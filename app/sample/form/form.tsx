"use client";
import { DynamicForm } from "@/components/molecules/DynamicForm";
import { formSchema } from "./form-schema";

export default function DefaultForm() {
  return (
    <DynamicForm
      mode="update"
      formSchema={formSchema}
      initialValues={{ id: "test", hiddenField: "hidden" }}
      handleSubmit={(e) => console.log(e)}
    />
  );
}
