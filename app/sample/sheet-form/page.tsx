"use client";
import Form from "@/components/molecules/Form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import * as z from "zod";

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

const formSchema = z
  .object({
    name: z.string().min(3).describe("名前").default("foooooooo"),
    pass: z.string().min(8).describe("パスワード").default("password"),
    color: z
      .nativeEnum(["赤", "緑", "青"], {
        required_error: "選択してください。",
      })
      .describe("色")
      .optional(),
    userName: z
      .enum(users.map((user) => user.name))
      .describe("ユーザー")
      .default(users[0].name),
  })
  .transform((data) => {
    return {
      ...data,
      userId: users.find((user) => user.name === data.userName)?.id,
    };
  });

const fieldConfig = {
  pass: {
    inputProps: {
      type: "password",
    },
  },
};

function ControlledSheet() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (data) => {
    console.log(data);
    setOpen(false);
  };

  return (
    <Sheet open={open}>
      <SheetTrigger onClick={() => setOpen(true)}>フォームを開く</SheetTrigger>
      <SheetContent
        onInteractOutside={() => setOpen(false)}
        onCloseClick={() => setOpen(false)}
      >
        <SheetHeader>
          <SheetTitle>フォーム</SheetTitle>
          <SheetDescription>フォームを記入してください。</SheetDescription>
        </SheetHeader>
        <Form
          onSubmit={handleSubmit}
          formSchema={formSchema}
          fieldConfig={fieldConfig}
        />
      </SheetContent>
    </Sheet>
  );
}

export default function Page() {
  return (
    <div className="grid">
      <ControlledSheet />
    </div>
  );
}
