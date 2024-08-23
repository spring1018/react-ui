"use client";

import Editor from "@/components/molecules/Editor";
import { FormFieldCombobox } from "@/components/molecules/FormFieldCombobox";
import { FormFieldDatePicker } from "@/components/molecules/FormFieldDatePicker";
import { FormFieldInput } from "@/components/molecules/FormFieldInput";
import { FormFieldSelect } from "@/components/molecules/FormFieldSelect";
import { FormFieldTextArea } from "@/components/molecules/FormFieldTextArea";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const languages = [
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Python", value: "python" },
  { label: "Go", value: "go" },
];

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z.string({
    required_error: "Please select an email to display.",
  }),
  bio: z.string().max(160).min(4),
  startDate: z.date(),
  endDate: z.date(),
  language: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CustomForm({
  defaultValues = {},
}: { defaultValues?: Partial<FormValues> }) {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: FormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormFieldInput
          form={form}
          formFieldName="username"
          formFieldLabel="Username"
        />
        <FormFieldSelect
          form={form}
          formFieldName="email"
          formFieldLabel="Email"
          options={[
            { label: "Email 1", value: "email1" },
            { label: "Email 2", value: "email2" },
            { label: "Email 3", value: "email3" },
          ]}
          defaultValue="email2"
        />
        <FormFieldTextArea
          form={form}
          formFieldName="bio"
          formFieldLabel="Bio"
        />
        <div className="grid grid-cols-2 gap-4">
          <FormFieldDatePicker
            form={form}
            formFieldName="startDate"
            formFieldLabel="Start Date"
          />
          <FormFieldDatePicker
            form={form}
            formFieldName="endDate"
            formFieldLabel="End Date"
          />
        </div>
        <FormFieldCombobox
          form={form}
          formFieldName="language"
          formFieldLabel="Language"
          options={languages}
        />
        <Editor
          initialContent={defaultValues.text}
          handleChange={(content) => form.setValue("text", content)}
        />
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}
