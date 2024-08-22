import Link from "next/link";

const links = [
  { href: "/sample/chart-clickable", label: "Chart Clickable" },
  { href: "/sample/chart-ppm", label: "Chart PPM" },
  { href: "/sample/editable-table", label: "Editable Table" },
  { href: "/sample/editor", label: "Editor" },
  { href: "/sample/form", label: "Form" },
  { href: "/sample/gantt", label: "Gantt" },
  { href: "/sample/kanban", label: "Kanban" },
  { href: "/sample/resizable-layout", label: "Resizable Layout" },
  { href: "/sample/sidebar-layout", label: "Sidebar Layout" },
  { href: "/sample/sheet-form", label: "Sheet Form" },
  { href: "/sample/sheet-table-with-db", label: "Sheet Table with DB" },
  { href: "/sample/table", label: "Table" },
  { href: "/sample/tabs", label: "Tabs" },
  { href: "/sample/timeline", label: "Timeline" },
];

export default async function IndexPage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          {links.map((link) => (
            <Link
              href={link.href}
              className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
