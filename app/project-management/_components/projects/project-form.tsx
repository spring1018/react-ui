"use client";

import { FormFieldDatePicker } from "@/components/molecules/FormFieldDatePicker";
import { FormFieldInput } from "@/components/molecules/FormFieldInput";
import { FormFieldSelect } from "@/components/molecules/FormFieldSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Editor from "@/components/molecules/Editor";
import { Button } from "@/components/ui/button";
import { Form, FormLabel } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const projectFormSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.string(),
  start: z.date(),
  end: z.date(),
  progress: z.coerce.number().int().min(0).max(100),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

export default function ProjectForm({
  defaultValues = {},
}: { defaultValues?: Partial<ProjectFormValues> }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false); // ローディング状態を管理
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      id: "",
      title: "",
      description: "",
      status: "todo",
      start: new Date(),
      end: new Date(),
      progress: 0,
      ...defaultValues,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: ProjectFormValues) => {
    setIsLoading(true); // Submit開始時にローディング状態にする
    try {
      if (data.id === "") {
        await fetch("/api/project-management/projects", {
          method: "POST",
          body: JSON.stringify(data),
        });
        toast({ description: "Project created successfully" });
      } else {
        await fetch(`/api/project-management/projects/${data.id}`, {
          method: "PUT",
          body: JSON.stringify(data),
        });
        toast({ description: "Project updated successfully" });
      }
    } catch (error) {
      toast({ description: "An error occurred" });
    } finally {
      setIsLoading(false); // Submit完了後にローディング状態を解除
      router.refresh();
    }
  };

  const onDelete = async (data: ProjectFormValues) => {
    await fetch(`/api/project-management/projects/${data.id}`, {
      method: "DELETE",
    });
    router.refresh();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mx-2">
        <input type="hidden" {...form.register("id")} />
        <FormFieldInput
          form={form}
          formFieldName="title"
          formFieldLabel="タイトル"
        />
        <div className="grid grid-cols-2 gap-2">
          <FormFieldSelect
            form={form}
            formFieldName="status"
            formFieldLabel="ステータス"
            options={[
              { label: "未着手", value: "todo" },
              { label: "進行中", value: "in progress" },
              { label: "完了", value: "done" },
            ]}
            defaultValue={defaultValues.status}
          />
          <FormFieldInput
            form={form}
            formFieldName="progress"
            formFieldLabel="進捗 (%)"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <FormFieldDatePicker
            form={form}
            formFieldName="start"
            formFieldLabel="開始日"
          />
          <FormFieldDatePicker
            form={form}
            formFieldName="end"
            formFieldLabel="終了日"
          />
        </div>
        <div>
          <FormLabel>詳細</FormLabel>
          <Editor
            initialContent={defaultValues.description}
            handleChange={(content) => form.setValue("description", content)}
          />
        </div>
        <div className="flex justify-start">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 /> : "保存"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
