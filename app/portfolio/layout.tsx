import { getServerSession } from "@/app/_clients/nextAuth";
import { AuthProvider } from "@/app/_providers/AuthProviders";
import AuthNavBar from "@/components/molecules/AuthNavBar";
import type { Metadata } from "next";
import type { PropsWithChildren, ReactNode } from "react";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Generated by create next app",
};

const items = [
  { title: "Portfolio", href: "/portfolio" },
  { title: "Soft Skills (TBD)", href: "/portfolio/soft-skills" },
  { title: "Data (TBD)", href: "/portfolio/data" },
  { title: "Frontend", href: "/portfolio/frontend" },
  { title: "Backend (TBD)", href: "/portfolio/backend" },
];

type Props = PropsWithChildren<{
  children: ReactNode;
}>;

export default async function SiteLayout({ children }: Props) {
  const session = await getServerSession();
  return (
    <AuthProvider>
      <AuthNavBar logoText={"App"} items={items} session={session} />
      <main className="py-4 px-8 flex-1 overflow-y-auto">{children}</main>
    </AuthProvider>
    // {dialog}
  );
}
