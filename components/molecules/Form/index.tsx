import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";

// このコンポーネントは汎用的なフォームのため、Sheet に依存する処理は書かない
export default function Form({
  onSubmit,
  formSchema,
  fieldConfig,
  className = "max-w-lg mx-auto my-6",
}) {
  return (
    <div className={className}>
      <AutoForm
        onSubmit={onSubmit}
        formSchema={formSchema}
        fieldConfig={fieldConfig}
      >
        <AutoFormSubmit>保存</AutoFormSubmit>
      </AutoForm>
    </div>
  );
}
