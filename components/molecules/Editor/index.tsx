"use client";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useMemo } from "react";
import "./styles.css";

interface EditorProps {
	mode?: "view" | "edit";
	initialContent?: string;
	handleChange?: (content: string) => void;
	handleBlur?: (content: string) => void;
}

export default function Editor({
	mode = "view",
	initialContent = "",
	handleChange = () => {},
	handleBlur = () => {},
}: EditorProps) {
	const parsedContent: PartialBlock[] | undefined = useMemo(() => {
		return initialContent ? JSON.parse(initialContent) : undefined;
	}, [initialContent]);

	const editor = useMemo(() => {
		return BlockNoteEditor.create({
			initialContent: parsedContent,

			domAttributes: {
				editor: {
					style: "font-size: 14px;padding-inline: 40px",
				},
			},
		});
	}, [parsedContent]);

	if (editor === undefined) {
		return "Loading content...";
	}

	return (
		<div className="w-full">
			<BlockNoteView
				editor={editor}
				data-theming-css-variables-demo // ref: https://www.blocknotejs.org/docs/styling-theming/adding-dom-attributes
				editable={mode === "edit"}
				onChange={() => handleChange(JSON.stringify(editor.document))}
				onBlur={() => handleBlur(JSON.stringify(editor.document))}
			/>
		</div>
	);
}
