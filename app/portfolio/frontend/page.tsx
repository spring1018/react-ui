import { IssueList } from "@/app/api/portfolio/_components/issue-list";
import { OGPCard } from "@/components/molecules/OGPCard";

const apps = [
  {
    title: "Project Management",
    description:
      "プロジェクト管理アプリ。階層的なタスクのスケジュールをガントチャートで管理。",
    image: "/og-images/project-management.png",
    url: "/sheet-table",
    tags: ["TypeScript", "React", "Next.js"],
  },
];

const books = [
  {
    title: "実践 Next.js",
    description: "めっちゃいい本",
    image: "https://m.media-amazon.com/images/I/71Yjy2O1PXL._AC_UL320_.jpg",
    url: "https://github.com/spring1018/react-ui/issues/85",
    target: "_blank",
    tags: ["Next.js"],
  },
  {
    title: "Tailwind CSS 実践入門",
    description: "めっちゃいい本",
    image: "https://m.media-amazon.com/images/I/71FCeCVWsnL._AC_UL320_.jpg",
    url: "https://github.com/spring1018/react-ui/issues/77",
    target: "_blank",
    tags: ["Tailwind CSS"],
  },
  {
    title: "プロを目指す人のためのTypeScript入門",
    description: "めっちゃいい本",
    image: "https://m.media-amazon.com/images/I/812K9HC+RYL._AC_UL320_.jpg",
    url: "https://github.com/spring1018/react-ui/issues/76",
    target: "_blank",
    tags: ["TypeScript"],
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

const labels = [
  {
    value: "react",
    label: "React",
  },
  {
    value: "typescript",
    label: "TypeScript",
  },
  {
    value: "html",
    label: "HTML",
  },
  {
    value: "tailwind",
    label: "CSS",
  },
  {
    value: "component-design",
    label: "Component Design",
  },
  {
    value: "shadcn-ui",
    label: "UI Library",
  },
];

export default async function Page() {
  const issues = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/portfolio/frontend`,
    { cache: "no-cache" },
  )
    .then((res) => res.json())
    .then((data) => data.filter((issue) => !issue.labels.includes("book")));

  return (
    <div>
      <h1 className="text-3xl font-bold">Frontend</h1>

      <h2 className="text-2xl font-bold mt-8">Issues</h2>
      <div className="grid grid-cols-5 gap-2">
        {labels.map((label) => (
          <div key={label.value} className="space-y-2">
            <h3 className="text-xl font-bold mt-4">{label.label}</h3>
            <IssueList
              items={issues.filter((issue) =>
                issue.labels.includes(label.value),
              )}
              ignoreLabels={labels.map((label) => label.value)}
            />
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-8">Books</h2>
      <div className="flex flex-wrap">
        {books.map((item) => (
          <div key={item.title}>
            <OGPCard {...item} />
          </div>
        ))}
      </div>

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
