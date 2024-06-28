"use client";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
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

function renderField(type, field, options, placeholder) {
  switch (type) {
    case "input":
      return <Input placeholder={placeholder} {...field} />;
    case "textarea":
      return (
        <Textarea
          placeholder={placeholder}
          className="resize-none"
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
          const { type, options, placeholder } =
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
                    {renderField(type, field, options, placeholder)}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
        <div className="grid gap-y-2">
          <Button type="submit">保存</Button>
          {mode === "update" && (
            <Button onClick={handleDelete} variant="outline">
              削除
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
