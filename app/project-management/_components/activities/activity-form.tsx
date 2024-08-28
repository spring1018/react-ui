"use client";
import { DeleteDialogButton } from "@/components/molecules/DeleteDialog";
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

const activityFormSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  userId: z.string(),
  tag: z.string(),
  content: z.string(),
});

type ActivityFormValues = z.infer<typeof activityFormSchema>;

interface ActivityFormProps {
  defaultValues?: Partial<ActivityFormValues>;
  setOpen?: (open: boolean) => void;
}

export default function ActivityForm({
  defaultValues = {},
  setOpen = () => {},
}: ActivityFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false); // ローディング状態を管理
  const form = useForm<ActivityFormValues>({
    resolver: zodResolver(activityFormSchema),
    defaultValues: {
      id: "",
      projectId: "",
      userId: "",
      tag: "",
      content: "",
      ...defaultValues,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: ActivityFormValues) => {
    setIsLoading(true); // Submit開始時にローディング状態にする
    try {
      if (data.id === "") {
        await fetch("/api/project-management/project-activities", {
          method: "POST",
          body: JSON.stringify(data),
        });
        toast({ description: "活動を登録しました" });
      } else {
        await fetch(`/api/project-management/project-activities/${data.id}`, {
          method: "PUT",
          body: JSON.stringify(data),
        });
        toast({ description: "活動を更新しました" });
      }
    } catch (error) {
      toast({ description: "エラーが発生しました" });
    } finally {
      setIsLoading(false); // Submit完了後にローディング状態を解除
      router.refresh();
    }
    setOpen(false);
  };

  const onDelete = async (data: ActivityFormValues) => {
    setIsLoading(true);
    try {
      await fetch(`/api/project-management/project-activities/${data.id}`, {
        method: "DELETE",
      });
      toast({ description: "活動を削除しました" });
    } catch (error) {
      toast({ description: "エラーが発生しました" });
    } finally {
      setIsLoading(false);
      router.push("/project-management");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mx-2">
        <input type="hidden" {...form.register("id")} />
        <FormFieldInput
          form={form}
          formFieldName="projectId"
          formFieldLabel="プロジェクトID"
        />
        <FormFieldInput
          form={form}
          formFieldName="userId"
          formFieldLabel="ユーザーID"
        />
        <FormFieldSelect
          form={form}
          formFieldName="tag"
          formFieldLabel="タグ"
          options={[
            { label: "議事録", value: "meeting" },
            { label: "メモ", value: "memo" },
            { label: "その他", value: "other" },
          ]}
        />
        <div>
          <FormLabel>詳細</FormLabel>
          <Editor
            mode="edit"
            initialContent={defaultValues.content}
            handleChange={(content) => form.setValue("content", content)}
          />
        </div>
        <div className="flex justify-between">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 /> : "保存"}
          </Button>
          <DeleteDialogButton
            onDelete={() => onDelete(form.getValues())}
            disabled={isLoading}
          />
        </div>
      </form>
    </Form>
  );
}
