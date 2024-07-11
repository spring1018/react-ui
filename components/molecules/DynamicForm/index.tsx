"use client";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

function renderField(type, field, options, placeholder, disabled = false) {
  switch (type) {
    case "input":
      return <Input placeholder={placeholder} disabled={disabled} {...field} />;
    case "textarea":
      return (
        <Textarea
          placeholder={placeholder}
          className="resize-none"
          disabled={disabled}
          {...field}
        />
      );
    case "combobox":
      return (
        <Combobox
          initialValue={field.value}
          onChange={(e) => field.onChange(e.value)}
          options={options}
        />
      );
    case "date":
      return <DatePicker date={field.value} setDate={field.onChange} />;
    default:
      return null;
  }
}

export function DynamicForm({
  mode,
  formSchema,
  initialValues,
  handleSubmit,
  handleDelete,
}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues, // initialValues を defaultValues に設定
    mode: "onChange",
  });

  function onSubmit(data) {
    handleSubmit(data);
  }

  const schemaDescriptions = formSchema._def.shape(); // .shape() を使用してスキーマのプロパティを取得

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {Object.keys(schemaDescriptions).map((key) => {
          const { type, options, placeholder, disabled } =
            schemaDescriptions[key].description;

          return (
            <FormField
              key={key}
              control={form.control}
              name={key}
              render={({ field }) => (
                <FormItem className="grid">
                  <FormLabel>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </FormLabel>
                  <FormControl>
                    {renderField(type, field, options, placeholder, disabled)}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
        <div className="grid gap-y-2">
          <Button type="submit">保存</Button>
          <Dialog>
            <DialogTrigger asChild>
              {mode === "update" && <Button variant="outline">削除</Button>}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>削除確認</DialogTitle>
              </DialogHeader>
              <DialogDescription>本当に削除しますか？</DialogDescription>
              <DialogFooter>
                <div className="flex justify-end space-x-2">
                  <DialogClose asChild>
                    <Button
                      onClick={handleDelete}
                      variant={"destructive"}
                      type="submit"
                    >
                      削除
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button variant="outline">キャンセル</Button>
                  </DialogClose>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </form>
    </Form>
  );
}
