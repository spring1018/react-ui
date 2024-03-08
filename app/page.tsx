import Link from "next/link";

export default async function IndexPage() {
	return (
		<>
			<section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
				<div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
					<Link
						href="/sample"
						className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
					>
						Sample
					</Link>
					<Link
						href="/taxonomy"
						className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
					>
						Taxonomy
					</Link>
				</div>
			</section>
		</>
	);
}
