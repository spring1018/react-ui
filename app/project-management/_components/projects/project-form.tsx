"use client";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Editor from "@/components/molecules/Editor";
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
import { useRouter } from "next/navigation";

const projectFormSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.string(),
  start: z.date(),
  end: z.date(),
  progress: z.number(),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

export default function ProjectForm({
  defaultValues = {},
}: { defaultValues?: Partial<ProjectFormValues> }) {
  const router = useRouter();
  const { toast } = useToast();
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
        toast({ description: "Project created successfully" });
      }
    } catch (error) {
      toast({ description: "An error occurred" });
    }
    router.refresh();
  };

  const onDelete = async (data: ProjectFormValues) => {
    await fetch(`/api/project-management/projects/${data.id}`, {
      method: "DELETE",
    });
    router.refresh();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <input type="hidden" {...form.register("id")} />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>タイトル</FormLabel>
              <FormControl>
                <Input placeholder="タイトルの入力" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ステータス</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="ステータスの選択" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="todo">ToDo</SelectItem>
                    <SelectItem value="in progress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="progress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>進捗 (%)</FormLabel>
                <FormControl>
                  <Input placeholder="進捗の入力" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="start"
            render={({ field }) => (
              <FormItem>
                <FormLabel>開始日</FormLabel>
                <FormControl>
                  <DatePicker
                    {...field}
                    date={new Date(field.value)}
                    setDate={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end"
            render={({ field }) => (
              <FormItem>
                <FormLabel>終了日</FormLabel>
                <FormControl>
                  <DatePicker
                    {...field}
                    date={new Date(field.value)}
                    setDate={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
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
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
