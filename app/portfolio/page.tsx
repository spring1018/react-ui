import { OGPCard } from "@/components/molecules/OGPCard";

const apps = [
  {
    title: "SQL Practice",
    description: "SQL の練習ができるアプリ。Streamlit で作成。",
    image: "/og-images/sql-plactice.png",
    url: "/sheet-table",
    tags: ["Python", "Streamlit"],
  },
  {
    title: "Project Management",
    description:
      "プロジェクト管理アプリ。階層的なタスクのスケジュールをガントチャートで管理。",
    image: "/og-images/project-management.png",
    url: "/sheet-table",
    tags: ["TypeScript", "React", "Next.js"],
  },
];

const components = [
  {
    title: "Sheet Table",
    description: "表形式のデータを表示。CRUD 操作が可能。",
    image: "/og-images/sheet-table.png",
    url: "/sample/sheet-table",
  },
  {
    title: "Form",
    description: "Zod schema に基づいたフォームを動的に生成する。",
    image: "/og-images/form.png",
    url: "/sample/form",
  },
];

export default async function Page() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Portfolio</h1>
      <p className="text-gray-500">This is a portfolio page.</p>
      <h2 className="text-2xl font-bold mt-8">Apps</h2>
      <p className="text-gray-500">These are the apps I have created.</p>
      <div className="flex flex-wrap">
        {apps.map((item) => (
          <div key={item.title}>
            <OGPCard {...item} />
          </div>
        ))}
      </div>
      <h2 className="text-xl font-bold mt-8">Components</h2>
      <div className="flex flex-wrap">
        {components.map((item) => (
          <div key={item.title}>
            <OGPCard {...item} />
          </div>
        ))}
      </div>
    </div>
  );
}
