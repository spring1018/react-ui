import { OGPCard } from "@/components/molecules/OGPCard";

const items = [
  {
    title: "Sheet Table",
    description: "表形式のデータを表示するコンポーネント。CRUD 操作が可能。",
    image: "/og-images/sheet-table.png",
  },
  {
    title: "Form",
    description:
      "Zod schema に基づいたフォームを動的に生成するコンポーネント。",
    image: "/og-images/form.png",
  },
];

export default async function Page() {
  return (
    <div className="grid grid-cols-5 gap-4">
      {items.map((item) => (
        <div key={item.title} className="w-90">
          <OGPCard {...item} />
        </div>
      ))}
    </div>
  );
}
