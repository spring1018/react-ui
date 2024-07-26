import CodeDisplay from "@/components/atoms/CodeDisplay";
import DefaultForm from "./form";

export default async function FormPage() {
  const body = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/sample/utils/get-file-body?filePath=app/sample/form/form-schema.ts`,
  )
    .then((res) => res.json())
    .then((res) => res.body);
  return (
    <div className="grid grid-cols-2 gap-2">
      <DefaultForm />
      <CodeDisplay body={body} lang="ts" />
    </div>
  );
}
