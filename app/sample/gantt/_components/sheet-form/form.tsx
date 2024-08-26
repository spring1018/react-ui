"use client";

import { DeleteDialogButton } from "@/components/molecules/DeleteDialog";
import { FormFieldCombobox } from "@/components/molecules/FormFieldCombobox";
import { FormFieldDatePicker } from "@/components/molecules/FormFieldDatePicker";
import { FormFieldInput } from "@/components/molecules/FormFieldInput";
import { FormFieldSelect } from "@/components/molecules/FormFieldSelect";
import { FormFieldTextArea } from "@/components/molecules/FormFieldTextArea";
// import Editor from "@/components/molecules/Editor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const taskFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.string(),
  progress: z.number(),
  type: z.string(),
  start: z.date(),
  end: z.date(),
  parentTaskId: z.string().nullish(),
  description: z.string().optional(),
  projectId: z.string(),
});

type TaskFormValues = z.infer<typeof taskFormSchema>;

const statuses = [
  { label: "未着手", value: "todo" },
  { label: "進行中", value: "in progress" },
  { label: "完了", value: "done" },
];

interface CustomFormProps {
  tasks: any[];
  defaultValues?: Partial<TaskFormValues>;
  handleSubmit: () => void;
}

export default function CustomForm({
  tasks,
  defaultValues = {},
  handleSubmit,
}: CustomFormProps) {
  const { toast } = useToast();
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      id: "",
      name: "",
      type: "task",
      start: new Date(),
      end: new Date(),
      progress: 0,
      status: "todo",
      description: "",
      projectId: "1", // necessary to set a default value in sample
      ...defaultValues,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: TaskFormValues) => {
    try {
      if (data.id) {
        await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/project-management/tasks/${data.id}`,
          {
            method: "PUT",
            body: JSON.stringify(data),
          },
        );
        // toast({ description: "Task updated successfully" });
        toast({
          title: "Success",
          description: <pre>{JSON.stringify(data, null, 2)}</pre>,
        });
      } else {
        await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/project-management/tasks`,
          {
            method: "POST",
            body: JSON.stringify(data),
          },
        );
        // toast({ description: "Task created successfully" });
        toast({
          title: "Success",
          description: <pre>{JSON.stringify(data, null, 2)}</pre>,
        });
      }
    } catch (error) {
      toast({ description: "An error occurred" });
    }
    handleSubmit();
  };

  const onDelete = async (data: TaskFormValues) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/project-management/tasks/${data.id}`,
        {
          method: "DELETE",
        },
      );
      toast({ description: "Task deleted successfully" });
    } catch (error) {
      toast({ description: "An error occurred" });
    }
    handleSubmit();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormFieldInput
          form={form}
          formFieldName="name"
          formFieldLabel="タイトル"
        />
        <div className="grid grid-cols-2 gap-4">
          <FormFieldSelect
            form={form}
            formFieldName="status"
            formFieldLabel="ステータス"
            options={statuses}
          />
          <FormField
            control={form.control}
            name="progress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>進捗 (%)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormFieldSelect
            form={form}
            formFieldName="type"
            formFieldLabel="タスクタイプ"
            options={[
              { label: "Task", value: "task" },
              { label: "Milestone", value: "milestone" },
            ]}
          />
          <div>担当者</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
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
        <FormFieldCombobox
          form={form}
          formFieldName="parentTaskId"
          formFieldLabel="親タスク"
          options={tasks
            .filter((task) => !task.parentTaskId)
            .map((task) => ({
              label: task.name,
              value: task.id,
            }))}
        />
        <FormFieldTextArea
          form={form}
          formFieldName="description"
          formFieldLabel="詳細"
        />
        {/* <FormField
          control={form.control}
          name="projectId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>プロジェクト</FormLabel>
              <FormControl>
                <Input placeholder="入力" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        {/* <Editor
          initialContent={defaultValues.text}
          handleChange={(content) => form.setValue("text", content)}
        /> */}
        <div className="flex justify-between">
          <Button type="submit" className="w-32">
            保存
          </Button>
          <DeleteDialogButton onDelete={() => onDelete(form.getValues())} />
        </div>
      </form>
    </Form>
  );
}
