"use client";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import * as z from "zod";

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

const formSchema = z
  .object({
    name: z.string().min(3).describe("名前"),
    pass: z.string().min(8).describe("パスワード"),
    color: z
      .nativeEnum(["赤", "緑", "青"], {
        required_error: "選択してください。",
      })
      .describe("色")
      .optional(),
    userName: z.enum(users.map((user) => user.name)).describe("ユーザー"),
  })
  .transform((data) => {
    return {
      ...data,
      userId: users.find((user) => user.name === data.userName)?.id,
    };
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
        }}
      >
        <AutoFormSubmit>送信</AutoFormSubmit>
      </AutoForm>
    </div>
  );
}
