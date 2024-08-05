"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { type Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List, ListOrdered, Strikethrough } from "lucide-react";
import { useState } from "react";

interface RichTextEditorProps {
  initialContent: string;
}

const RichTextEditor = ({ initialContent }: RichTextEditorProps) => {
  const [content, setContent] = useState(initialContent);
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "min-h-[80px] max-h-[180px] w-full rounded-md rounded-br-none rounded-bl-none border border-input bg-transparent px-3 py-2 border-b-0 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-auto",
      },
      handleKeyDown(view, event) {
        if (event.key === "Tab") {
          event.preventDefault();
          const { state, dispatch } = view;
          const { schema, tr } = state;
          const isShift = event.shiftKey;
          const list = schema.nodes.bulletList || schema.nodes.orderedList;

          if (list) {
            const { selection } = state;
            const { $from, $to } = selection;
            const nodeBefore = $from.node(-1);
            const isListItem = nodeBefore.type === schema.nodes.listItem;

            if (isListItem && editor) {
              const isIndent = !isShift;
              const result = isIndent
                ? editor.chain().focus().toggleList().run()
                : editor.chain().focus().toggleList().run();

              if (result) {
                return true;
              }
            }
          }
          return false;
        }
        return false;
      },
    },
    extensions: [
      StarterKit.configure({
        heading: {
          HTMLAttributes: {
            class: "text-lg font-semibold",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-4",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-4",
          },
        },
      }),
    ],
    content: content,
    // '<h1 class="text-lg font-semibold">asdfasdf</h1><ul class="list-disc pl-4"><li><p>asdf</p></li><li><p>asdf</p><ul class="list-disc pl-4"><li><p></p></li></ul></li></ul>',
  });

  return (
    <>
      <EditorContent editor={editor} />
      {editor ? <RichTextEditorToolbar editor={editor} /> : null}
    </>
  );
};

const RichTextEditorToolbar = ({ editor }: { editor: Editor | null }) => {
  return (
    <div className="border border-input bg-transparent rounded-br-md rounded-bl-md p-1 flex flex-row items-center gap-1">
      <Toggle
        size="sm"
        pressed={editor?.isActive("bold")}
        onPressedChange={() => editor?.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor?.isActive("italic")}
        onPressedChange={() => editor?.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor?.isActive("strike")}
        onPressedChange={() => editor?.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="w-[1px] h-8" />
      <Toggle
        size="sm"
        pressed={editor?.isActive("bulletList")}
        onPressedChange={() => editor?.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor?.isActive("orderedList")}
        onPressedChange={() =>
          editor?.chain().focus().toggleOrderedList().run()
        }
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
      <Button size="sm" onClick={() => console.log(editor?.getHTML())}>
        Save
      </Button>
      <Dialog>
        <DialogTrigger>
          <Button size="sm">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[1500px]">
          <RichTextEditor />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RichTextEditor;
