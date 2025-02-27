import { getServerSession } from "@/app/_clients/nextAuth";
import { AuthProvider } from "@/app/_providers/AuthProviders";
import AuthNavBar from "@/components/molecules/AuthNavBar";
import type { Metadata } from "next";
import type { PropsWithChildren, ReactNode } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Generated by create next app",
};

const items = [
  { title: "ダッシュボード", href: "/cms/dashboard" },
  { title: "テーマ", href: "/cms/themes" },
  { title: "依頼書", href: "/cms/directions" },
];

type Props = PropsWithChildren<{
  children: ReactNode;
}>;

export default async function SiteLayout({ children }: Props) {
  const session = await getServerSession();
  return (
    <AuthProvider>
      <AuthNavBar logoText={"App"} items={items} session={session} />
      <main className="px-4 flex-1 overflow-y-auto">{children}</main>
    </AuthProvider>
    // {dialog}
  );
}
