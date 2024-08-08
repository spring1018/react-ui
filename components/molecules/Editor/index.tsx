"use client";
import { Button } from "@/components/ui/button";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useMemo } from "react";

async function saveToStorage(jsonBlocks: Block[]) {
  console.log("Saving content:", JSON.stringify(jsonBlocks));
  console.log("Saving content:", jsonBlocks);
}

interface EditorProps {
  initialContent: string;
  mode?: "view" | "edit";
}

export default function Editor({ initialContent, mode = "view" }: EditorProps) {
  const parsedContent: PartialBlock[] | undefined = useMemo(() => {
    return initialContent ? JSON.parse(initialContent) : undefined;
  }, [initialContent]);

  const editor = useMemo(() => {
    return BlockNoteEditor.create({
      initialContent: parsedContent,

      domAttributes: {
        editor: {
          style: "font-size: 16px;padding-inline: 40px",
        },
      },
    });
  }, [parsedContent]);

  if (editor === undefined) {
    return "Loading content...";
  }

  return (
    <div className="space-y-2">
      <BlockNoteView className={"hover:border"} editor={editor} />
      {mode === "edit" ? (
        <Button onClick={() => saveToStorage(editor.document)}>Save</Button>
      ) : null}
    </div>
  );
}
