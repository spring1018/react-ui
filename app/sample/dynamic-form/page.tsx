"use client";
import { DynamicForm } from "@/components/molecules/DynamicForm";
import { z } from "zod";

const frameworkOptions = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(30, { message: "Username must not be longer than 30 characters." })
    .describe({ type: "input", placeholder: "shadcn" }),
  email: z
    .string({ required_error: "Please select an email to display." })
    // .email()
    .describe({ type: "input", placeholder: "email@example.com" }),
  bio: z.string().max(160).min(4).describe({
    type: "textarea",
    placeholder: "Tell us a little bit about yourself",
  }),
  framework: z.string().describe({
    type: "combobox",
    options: frameworkOptions,
  }),
});

const initialValues = {
  username: "defaultUser",
  email: "default@example.com",
  bio: "This is a default bio.",
  framework: "react",
};

export default function Page() {
  return (
    <div>
      <DynamicForm
        formSchema={formSchema}
        initialValues={initialValues}
        handleSubmit={(data) => console.log(data)}
      />
    </div>
  );
}
