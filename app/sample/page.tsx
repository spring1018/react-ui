import Link from "next/link";

export default async function IndexPage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Link
            href="/sample/editable-table"
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
          >
            Editable Table
          </Link>
          <Link
            href="/sample/sheet-table"
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
          >
            Sheet Table
          </Link>
          <Link
            href="/sample/chart-clickable"
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
          >
            Chart Clickable
          </Link>
          <Link
            href="/sample/chart-ppm"
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
          >
            Chart PPM
          </Link>
          <Link
            href="/sample/form"
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
          >
            Form
          </Link>
          <Link
            href="/sample/sheet-form"
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
          >
            Sheet Form
          </Link>
        </div>
      </section>
    </>
  );
}
