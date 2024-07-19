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
  { title: "Home", href: "/taxonomy" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

type Props = PropsWithChildren<{
  children: ReactNode;
}>;

export default async function DashboardLayout({ children }: Props) {
  const session = await getServerSession();
  return (
    <AuthProvider>
      <AuthNavBar items={items} session={session} />
      <main className="py-4 px-8 flex-1 overflow-y-auto">{children}</main>
    </AuthProvider>
    // {dialog}
  );
}
