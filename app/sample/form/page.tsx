"use client";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { Input } from "@/components/ui/input";
import * as z from "zod";

enum BreadTypes {
  White = "White bread",
  Brown = "Brown bread",
  Wholegrain = "Wholegrain bread",
}

const formSchema = z.object({
  name: z.string().min(3).describe("名前"),
  pass: z.string().min(8).describe("パスワード"),
  color: z
    .enum(["赤", "緑", "青"], {
      required_error: "選択してください。",
    })
    .describe("色")
    .optional(),
  bread: z.nativeEnum(BreadTypes).optional(),
  foo: z.string().min(3).describe("ユーザー名"),
});

export default function FormPage() {
  return (
    <div className="max-w-lg mx-auto my-6">
      <AutoForm
        onSubmit={(data) => console.log(data)}
        formSchema={formSchema}
        fieldConfig={{
          pass: {
            inputProps: {
              type: "password",
            },
          },
          foo: {
            fieldType: (props) => (
              <Input {...props} placeholder="ユーザー名を入力してください" />
            ),
          },
        }}
      >
        <AutoFormSubmit>送信</AutoFormSubmit>
      </AutoForm>
    </div>
  );
}
