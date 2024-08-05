import RichTextEditor from "@/components/molecules/RichTextEditor";

export default function Page() {
  return (
    <div>
      <RichTextEditor
        initialContent={[
          "<h1>foo</h1>",
          "<li><p>bar</p></li>",
          "<li><p>baz</p></li>",
        ].join("")}
      />
    </div>
  );
}
